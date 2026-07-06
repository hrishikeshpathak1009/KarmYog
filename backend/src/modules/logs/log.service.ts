import { and, eq } from "drizzle-orm";

import { db } from "../../config/db.js";
import { habitLogs } from "../../schemas/habitLog.js";

import { UpdateLogInput } from "./log.types.js";

export const updateTodayLog = async (
  habitId: string,
  data: UpdateLogInput
) => {

  const today = new Date().toISOString().split("T")[0];

  const [existingLog] = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.date, today)
      )
    );

  if (existingLog) {

    const [updatedLog] = await db
      .update(habitLogs)
      .set({
        completedValue: data.CompletedValue,
        note: data.note,
        completedAt: new Date()
      })
      .where(eq(habitLogs.id, existingLog.id))
      .returning();

    return updatedLog;
  }

  const [newLog] = await db
    .insert(habitLogs)
    .values({
      habitId,
      date: today,
      completedValue: data.CompletedValue,
      note: data.note,
      completedAt: new Date()
    })
    .returning();

  return newLog;

};