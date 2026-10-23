import { createNote } from "@/app/actions";
import { NoteForm } from "@/components/NoteForm";

export default function NewNotePage() {
  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">New note</h1>
      <NoteForm action={createNote} />
    </main>
  );
}
