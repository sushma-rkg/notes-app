import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  content: text().notNull().default(""),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export type Note = typeof notes.$inferSelect;
