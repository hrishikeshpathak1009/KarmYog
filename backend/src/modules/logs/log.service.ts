import { and, asc, eq } from "drizzle-orm";

import { db } from "../../config/db.js";

import { habits } from "../../schemas/habit.js";
import { habitLogs } from "../../schemas/habitLog.js";

import { UpdateLogInput } from "./log.types.js";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export const getOrCreateTodayLog = async (
  habitId: string
) => {
  const today = getToday();

  const [log] = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.date, today)
      )
    );

  if (log) return log;

  const [newLog] = await db
    .insert(habitLogs)
    .values({
      habitId,
      date: today,
    })
    .returning();

  return newLog;
};

export const updateTodayLog = async (
  habitId: string,
  data: UpdateLogInput
) => {
  const log =
    await getOrCreateTodayLog(habitId);

  const [updated] = await db
    .update(habitLogs)
    .set({
      completedValue: data.completedValue,
      completed: data.completed ?? false,
      skipped: data.skipped ?? false,
      note: data.note,
      completedAt: data.completed
        ? new Date()
        : null,
    })
    .where(eq(habitLogs.id, log.id))
    .returning();

  return updated;
};

export const incrementLog = async (
  habitId: string
) => {
  const [habit] = await db
    .select()
    .from(habits)
    .where(eq(habits.id, habitId));

  if (!habit) {
    throw new Error("Habit not found");
  }

  const log =
    await getOrCreateTodayLog(habitId);

  const nextValue = Math.min(
    log.completedValue + 1,
    habit.targetValue
  );

  const [updated] = await db
    .update(habitLogs)
    .set({
      completedValue: nextValue,
      completed:
        nextValue >= habit.targetValue,
      completedAt:
        nextValue >= habit.targetValue
          ? new Date()
          : null,
    })
    .where(eq(habitLogs.id, log.id))
    .returning();

  return updated;
};

export const decrementLog = async (
  habitId: string
) => {
  const log =
    await getOrCreateTodayLog(habitId);

  const nextValue = Math.max(
    0,
    log.completedValue - 1
  );

  const [updated] = await db
    .update(habitLogs)
    .set({
      completedValue: nextValue,
      completed: false,
      completedAt: null,
    })
    .where(eq(habitLogs.id, log.id))
    .returning();

  return updated;
};

export const completeLog = async (
  habitId: string
) => {
  const [habit] = await db
    .select()
    .from(habits)
    .where(eq(habits.id, habitId));

  if (!habit) {
    throw new Error("Habit not found");
  }

  const log =
    await getOrCreateTodayLog(habitId);

  const [updated] = await db
    .update(habitLogs)
    .set({
      completed: true,
      skipped: false,
      completedValue:
        habit.targetValue,
      completedAt: new Date(),
    })
    .where(eq(habitLogs.id, log.id))
    .returning();

  return updated;
};

export const getHabitLogs = async (
  habitId: string
) => {
  return await db
    .select()
    .from(habitLogs)
    .where(eq(habitLogs.habitId, habitId))
    .orderBy(asc(habitLogs.date));
};