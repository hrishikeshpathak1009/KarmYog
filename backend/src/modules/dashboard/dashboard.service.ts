import { and, eq } from "drizzle-orm";

import { db } from "../../config/db.js";

import { habits } from "../../schemas/habit.js";
import { habitLogs } from "../../schemas/habitLog.js";

import { getAnalytics } from "../analytics/analytics.service.js";

export const getDashboard = async (
  userId: string
) => {
  const analytics =
    await getAnalytics(userId);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const userHabits = await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId));

  const todayHabits = await Promise.all(
    userHabits.map(async (habit) => {
      const [log] = await db
        .select()
        .from(habitLogs)
        .where(
          and(
            eq(habitLogs.habitId, habit.id),
            eq(habitLogs.date, today)
          )
        );

      const completedValue =
        log?.completedValue ?? 0;

      const progress =
        habit.type === "completion"
          ? log?.completed
            ? 100
            : 0
          : Math.min(
              100,
              Math.round(
                (completedValue /
                  habit.targetValue) *
                  100
              )
            );

      return {
        id: habit.id,
        title: habit.title,
        type: habit.type,
        kind: habit.kind,

        targetValue:
          habit.targetValue,

        unit: habit.unit,

        completedValue,

        progress,

        completed:
          log?.completed ??
          progress >= 100,
      };
    })
  );

  return {
    summary:
      analytics.summary,

    todayHabits,
    topStreaks: analytics.topStreaks,
  };
};