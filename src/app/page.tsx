import { desc } from "drizzle-orm";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { db } from "@/db";
import { notes } from "@/db/schema";

async function NotesList() {
  await connection();
  const all = await db.select().from(notes).orderBy(desc(notes.updatedAt));

  if (all.length === 0) {
    return <p className="text-zinc-500">No notes yet. Create your first one!</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {all.map((note) => (
        <li key={note.id}>
          <Link
            href={`/notes/${note.id}`}
            className="block rounded border border-zinc-300 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <h2 className="font-semibold">{note.title}</h2>
            <p className="line-clamp-2 whitespace-pre-wrap text-zinc-600">
              {note.content}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Link
          href="/notes/new"
          className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          New note
        </Link>
      </div>
      <Suspense fallback={<p className="text-zinc-500">Loading notes...</p>}>
        <NotesList />
      </Suspense>
    </main>
  );
}
