import Link from "next/link";
import type { Note } from "@/db/schema";

export function NoteForm({
  action,
  note,
}: {
  action: (formData: FormData) => void | Promise<void>;
  note?: Note;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <input
        name="title"
        defaultValue={note?.title}
        placeholder="Title"
        maxLength={200}
        required
        className="rounded border border-zinc-300 bg-transparent px-3 py-2 text-lg"
      />
      <textarea
        name="content"
        defaultValue={note?.content}
        placeholder="Write your note..."
        rows={12}
        className="rounded border border-zinc-300 bg-transparent px-3 py-2"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          Save
        </button>
        <Link href="/" className="px-4 py-2 text-zinc-600">
          Cancel
        </Link>
      </div>
    </form>
  );
}
