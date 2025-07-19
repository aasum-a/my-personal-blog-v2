import { fetchPosts } from "@/lib/data";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 font-serif">Semua Tulisan</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="p-6 bg-white rounded-lg shadow-md">
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-bold font-sans hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mt-2">
              {new Date(post.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-4 font-serif text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
