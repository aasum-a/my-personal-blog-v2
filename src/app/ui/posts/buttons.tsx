"use client";

import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deletePost, State } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export function UpdatePostButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/posts/${id}/edit`}
      className="p-2 rounded-md border hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="p-2 rounded-md border hover:bg-gray-100 disabled:bg-gray-200"
      disabled={pending}
    >
      <span className="sr-only">Hapus</span>
      <TrashIcon className="w-5 text-red-500" />
    </button>
  );
}

export function DeletePostButton({ id }: { id: string }) {
  const initialState: State = { message: null, errors: {} };
  const deletePostWithId = deletePost.bind(null, id);
  const [state, formAction] = useActionState(deletePostWithId, initialState);

  useEffect(() => {
    if (state?.message?.includes("berhasil")) {
      toast.success(state.message);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <DeleteButton />
    </form>
  );
}
