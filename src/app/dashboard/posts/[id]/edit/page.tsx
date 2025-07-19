import { fetchPostById } from "@/lib/data";
import { EditPostForm } from "@/app/ui/posts/edit-form";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const post = await fetchPostById(id);

  if (!post) {
    notFound(); // Tampilkan 404 jika post tidak ada
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Artikel</h1>
      <EditPostForm post={post} />
    </div>
  );
}
