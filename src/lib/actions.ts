"use server";

import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Judul tidak boleh kosong." }),
  content: z.string().min(1, { message: "Konten tidak boleh kosong." }),
});

const CreatePostSchema = PostSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal membuat post. Harap periksa kembali isian Anda.",
    };
  }

  const { title, content } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO posts (title, content, date)
      VALUES (${title}, ${content}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Gagal membuat post.",
    };
  }
  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

const UpdatePostSchema = PostSchema.omit({ id: true });

export async function updatePost(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal mengupdate post.",
    };
  }

  const { title, content } = validatedFields.data;

  try {
    await sql`
      UPDATE posts
      SET title = ${title}, content = ${content}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Gagal mengupdate post." };
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function deletePost(
  id: string,
  prevState: State,
  formData: FormData
) {
  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    revalidatePath("/dashboard/posts");
    // Kita bisa mengembalikan pesan sukses di sini untuk notifikasi
    return { message: "Post berhasil dihapus." };
  } catch (error) {
    return { message: "Database Error: Gagal menghapus post." };
  }
}
