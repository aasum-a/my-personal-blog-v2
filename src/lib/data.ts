import postgres from "postgres";
import { Post } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchPosts() {
  try {
    const data = await sql<Post[]>`SELECT * FROM posts ORDER BY date DESC`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal mengambil data posts.");
  }
}

export async function fetchPostById(id: string) {
  try {
    const data = await sql<Post[]>`SELECT * FROM posts WHERE id = ${id}`;
    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal mengambil post.");
  }
}
