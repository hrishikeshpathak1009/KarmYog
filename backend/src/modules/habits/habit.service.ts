import { and, eq } from "drizzle-orm";

import { db } from "../../config/db.js";
import { habits } from "../../schemas/habit.js";

import {
  CreateHabitInput,
  UpdateHabitInput,
} from "./habit.types.js";

export const createHabit = async (
  userId: string,
  data: CreateHabitInput
) => {
  const [habit] = await db
    .insert(habits)
    .values({
      userId,
      title: data.title,
      description: data.description,
      icon: data.icon,
      color: data.color,
      frequency: data.frequency,
      targetValue: data.targetValue,
      unit: data.unit,
    })
    .returning();

  return habit;
};

export const getHabits = async (userId: string) => {
  return await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId));
};

export const getHabitById = async (
  userId: string,
  habitId: string
) => {
  const [habit] = await db
    .select()
    .from(habits)
    .where(
      and(
        eq(habits.id, habitId),
        eq(habits.userId, userId)
      )
    );

  return habit;
};

export const updateHabit = async (
  userId: string,
  habitId: string,
  data: UpdateHabitInput
) => {
  const [habit] = await db
    .update(habits)
    .set(data)
    .where(
      and(
        eq(habits.id, habitId),
        eq(habits.userId, userId)
      )
    )
    .returning();

  return habit;
};

export const deleteHabit = async (
  userId: string,
  habitId: string
) => {
  await db
    .delete(habits)
    .where(
      and(
        eq(habits.id, habitId),
        eq(habits.userId, userId)
      )
    );

  return;
};