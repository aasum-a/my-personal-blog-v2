"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPost, State } from "@/lib/actions";

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

export function CreatePostForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createPost, initialState);

  return (
    <form
      action={formAction}
      className="mb-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Tambah Artikel Baru</h2>
      <div className="mb-4">
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
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
          required
        />
      </div>

      <div className="mb-4">
        <div id="content-error" aria-live="polite" aria-atomic="true">
          {state.errors?.content &&
            state.errors.content.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Konten
        </label>
        <textarea
          id="content"
          name="content"
          rows={5}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <SubmitButton />

      {state.message && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
}
