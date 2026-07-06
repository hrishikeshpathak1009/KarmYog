import { and, eq } from "drizzle-orm";

import { db } from "../../config/db.js";
import { habits } from "../../schemas/habit.js";
import { habitLogs } from "../../schemas/habitLog.js";

export const getDashboard = async (userId: string) => {
  const today = new Date().toISOString().split("T")[0];

  const userHabits = await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId));

  const logs = await db
    .select()
    .from(habitLogs);

  const todayHabits = userHabits.map((habit) => {
    const log = logs.find(
      (l) =>
        l.habitId === habit.id &&
        l.date === today
    );

    const completedValue = log?.completedValue ?? 0;

    const progress = Math.min(
      100,
      Math.round(
        (completedValue / habit.targetValue) * 100
      )
    );

    return {
      id: habit.id,
      title: habit.title,
      targetValue: habit.targetValue,
      completedValue,
      progress,
      completed: progress >= 100,
    };
  });

  const totalHabits = todayHabits.length;

  const completedToday = todayHabits.filter(
    (h) => h.completed
  ).length;

  const todayProgress =
    totalHabits === 0
      ? 0
      : Math.round(
          (completedToday / totalHabits) * 100
        );

  return {
    summary: {
      totalHabits,
      completedToday,
      todayProgress,
      currentStreak: 0,
      bestStreak: 0,
      weeklyCompletion: 0,
    },

    todayHabits,
  };
};