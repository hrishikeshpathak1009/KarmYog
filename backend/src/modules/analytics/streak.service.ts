interface HabitLog {
  date: string;
  completed: boolean;
}

export const calculateHabitStreak = (
  logs: HabitLog[]
) => {
  const completedDates = new Set(
    logs
      .filter((log) => log.completed)
      .map((log) => log.date)
  );

  if (completedDates.size === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
    };
  }

  // ---------------- Current Streak ----------------

  let currentStreak = 0;

  const cursor = new Date();

  const today = cursor
    .toISOString()
    .split("T")[0];

  if (!completedDates.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const key = cursor
      .toISOString()
      .split("T")[0];

    if (completedDates.has(key)) {
      currentStreak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  // ---------------- Best Streak ----------------

  const dates = [...completedDates].sort();

  let bestStreak = 0;
  let running = 0;

  let previous: Date | null = null;

  for (const date of dates) {
    const current = new Date(date);

    if (!previous) {
      running = 1;
    } else {
      const diff =
        (current.getTime() -
          previous.getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {
        running++;
      } else {
        running = 1;
      }
    }

    bestStreak = Math.max(
      bestStreak,
      running
    );

    previous = current;
  }

  return {
    currentStreak,
    bestStreak,
  };
};