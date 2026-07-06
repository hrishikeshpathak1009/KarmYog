import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./user.js";

export const habits = pgTable("habits", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),

  title: varchar("title", { length: 100 }).notNull(),

  description: text("description"),

  icon: varchar("icon", { length: 50 }),

  color: varchar("color", { length: 20 }),

  frequency: varchar("frequency", { length: 20 })
    .default("daily")
    .notNull(),

  targetValue: integer("target_value")
    .default(1)
    .notNull(),

  unit: varchar("unit", { length: 20 })
    .default("times")
    .notNull(),

  archived: boolean("archived")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});