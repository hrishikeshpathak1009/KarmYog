import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { habits } from "./habit.js";

export const habitLogs = pgTable(
  "habit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    habitId: uuid("habit_id")
      .references(() => habits.id, {
        onDelete: "cascade",
      })
      .notNull(),

    date: date("date").notNull(),

    completedValue: integer("completed_value")
      .default(0)
      .notNull(),

    completed: boolean("completed")
      .default(false)
      .notNull(),

    skipped: boolean("skipped")
      .default(false)
      .notNull(),

    note: text("note"),

    completedAt: timestamp("completed_at"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueHabitLog: unique().on(
      table.habitId,
      table.date
    ),
  })
);