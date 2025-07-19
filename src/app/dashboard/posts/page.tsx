import { fetchPosts } from "@/lib/data";
import { CreatePostForm } from "@/app/ui/posts/create-form";
import { UpdatePostButton, DeletePostButton } from "@/app/ui/posts/buttons";

export default async function ManagePostsPage() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manajemen Artikel</h1>
      <CreatePostForm />

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Daftar Artikel</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-md">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-600 mt-1">{post.content}</p>
              <div className="flex items-center gap-2">
                <UpdatePostButton id={post.id} />
                <DeletePostButton id={post.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
