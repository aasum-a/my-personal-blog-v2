"use client";

import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

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

export function DeletePostButton({ id }: { id: string }) {
  return (
    <>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Hapus</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
