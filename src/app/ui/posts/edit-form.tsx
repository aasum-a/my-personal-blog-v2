"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updatePost, State } from "@/lib/actions";
import { Post } from "@/lib/definitions";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:bg-gray-400"
      disabled={pending}
    >
      {pending ? "Menyimpan..." : "Simpan Artikel"}
    </button>
  );
}

export function EditPostForm({ post }: { post: Post }) {
  const initialState: State = { message: null, errors: {} };
  const updatePostWithId = updatePost.bind(null, post.id);
  const [state, formAction] = useActionState(updatePostWithId, initialState);

  return (
    <form action={formAction} className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Judul
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full p-2 border rounded-md"
          defaultValue={post.title}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Konten
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          className="w-full p-2 border rounded-md"
          defaultValue={post.content}
          required
        />
      </div>
      <div className="flex gap-4">
        <SubmitButton />
        <Link
          href="/dashboard/posts"
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
