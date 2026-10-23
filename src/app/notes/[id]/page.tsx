import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { deleteNote, updateNote } from "@/app/actions";
import { NoteForm } from "@/components/NoteForm";
import { db } from "@/db";
import { notes } from "@/db/schema";

async function EditNote({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const [note] = await db.select().from(notes).where(eq(notes.id, id));
  if (!note) notFound();

  return (
    <>
      <NoteForm action={updateNote.bind(null, id)} note={note} />
      <form action={deleteNote.bind(null, id)} className="mt-8">
        <button type="submit" className="text-red-600 hover:underline">
          Delete this note
        </button>
      </form>
    </>
  );
}

export default function NotePage({ params }: PageProps<"/notes/[id]">) {
  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit note</h1>
      <Suspense fallback={<p className="text-zinc-500">Loading...</p>}>
        <EditNote params={params} />
      </Suspense>
    </main>
  );
}
