"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { notes } from "@/db/schema";

function readFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim().slice(0, 200);
  const content = String(formData.get("content") ?? "").slice(0, 20000);
  return { title: title || "Untitled", content };
}

export async function createNote(formData: FormData) {
  await db.insert(notes).values(readFields(formData));
  revalidatePath("/");
  redirect("/");
}

export async function updateNote(id: number, formData: FormData) {
  await db
    .update(notes)
    .set({ ...readFields(formData), updatedAt: new Date() })
    .where(eq(notes.id, id));
  revalidatePath("/");
  redirect("/");
}

export async function deleteNote(id: number) {
  await db.delete(notes).where(eq(notes.id, id));
  revalidatePath("/");
  redirect("/");
}
