import { eq, inArray } from "drizzle-orm";

import { db } from "../../config/db.js";

import { habits } from "../../schemas/habit.js";
import { habitLogs } from "../../schemas/habitLog.js";

import { calculateHabitStreak } from "./streak.service.js";

export const getAnalytics = async (
  userId: string
) => {
  // ------------------------------------
  // Fetch User Karm
  // ------------------------------------

  const userHabits = await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId));

  if (userHabits.length === 0) {
    return {
      summary: {
        totalKarm: 0,
        totalLogs: 0,
        completedToday: 0,
        todayProgress: 0,
        completionRate: 0,
        karmScore: 0,
      },

      weeklyTrend: [],

      monthlyTrend: [],

      heatmap: [],

      topStreaks: [],
    };
  }

  // ------------------------------------
  // Fetch Logs
  // ------------------------------------

  const habitIds = userHabits.map(
    (habit) => habit.id
  );

  const logs = await db
    .select()
    .from(habitLogs)
    .where(
      inArray(
        habitLogs.habitId,
        habitIds
      )
    );

  // ------------------------------------
  // Group Logs by Habit
  // ------------------------------------

  const logsByHabit = new Map<
    string,
    typeof logs
  >();

  for (const log of logs) {
    if (!logsByHabit.has(log.habitId)) {
      logsByHabit.set(log.habitId, []);
    }

    logsByHabit
      .get(log.habitId)!
      .push(log);
  }

  // ------------------------------------
  // Summary
  // ------------------------------------

  const totalKarm = userHabits.length;

  const totalLogs = logs.length;

  const completedLogs = logs.filter(
    (log) => log.completed
  ).length;

  const completionRate =
    totalLogs === 0
      ? 0
      : Math.round(
          (completedLogs /
            totalLogs) *
            100
        );

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const todayLogs = logs.filter(
    (log) => log.date === today
  );

  const completedToday =
    todayLogs.filter(
      (log) => log.completed
    ).length;

  const todayProgress =
    totalKarm === 0
      ? 0
      : Math.round(
          (completedToday /
            totalKarm) *
            100
        );

  // ------------------------------------
  // Weekly Trend
  // ------------------------------------

  const weeklyTrend = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();

    d.setDate(
      d.getDate() - i
    );

    const date = d
      .toISOString()
      .split("T")[0];

    weeklyTrend.push({
      date,

      completed: logs.filter(
        (log) =>
          log.date === date &&
          log.completed
      ).length,
    });
  }

  // ------------------------------------
  // Monthly Trend
  // ------------------------------------

  const monthlyTrend = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date();

    d.setDate(
      d.getDate() - i
    );

    const date = d
      .toISOString()
      .split("T")[0];

    monthlyTrend.push({
      date,

      completed: logs.filter(
        (log) =>
          log.date === date &&
          log.completed
      ).length,
    });
  }

  // ------------------------------------
  // Heatmap
  // ------------------------------------

  const heatmap = logs.map(
    (log) => ({
      date: log.date,

      level: log.completed
        ? 4
        : log.completedValue > 0
        ? 2
        : 0,
    })
  );

  // ------------------------------------
  // Per Karm Streaks
  // ------------------------------------

  const topStreaks = userHabits
    .filter(
      (habit) =>
        habit.kind ===
        "habit"
    )
    .map((habit) => {
      const streak =
        calculateHabitStreak(
          logsByHabit.get(
            habit.id
          ) ?? []
        );

      return {
        id: habit.id,

        title: habit.title,

        currentStreak:
          streak.currentStreak,

        bestStreak:
          streak.bestStreak,
      };
    });

  topStreaks.sort(
    (a, b) =>
      b.currentStreak -
      a.currentStreak
  );

  // ------------------------------------
  // Return
  // ------------------------------------

  return {
    summary: {
      totalKarm,

      totalLogs,

      completedToday,

      todayProgress,

      completionRate,

      karmScore:
        todayProgress,
    },

    weeklyTrend,

    monthlyTrend,

    heatmap,

    topStreaks,
  };
};