import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import SummaryCard from "../../components/dashboard/SummaryCard";
import HabitCard from "../../components/dashboard/HabitCard";

import { getDashboard } from "../../services/dashboard.service";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  const longest =
    data.topStreaks?.[0];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Good Morning 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Build yourself one action at a
          time.
        </p>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Karm"
          value={data.summary.totalKarm}
        />

        <SummaryCard
          title="Completed Today"
          value={`${data.summary.completedToday}/${data.summary.totalKarm}`}
        />

        <SummaryCard
          title="Completion Rate"
          value={`${data.summary.completionRate}%`}
        />

        <SummaryCard
          title={
            longest
              ? longest.title
              : "Longest Streak"
          }
          value={
            longest
              ? `🔥 ${longest.currentStreak}`
              : "-"
          }
        />

      </div>

      {/* Progress */}

      <div className="rounded-2xl bg-white p-6 shadow">

        <div className="mb-4 flex justify-between">

          <h2 className="text-xl font-semibold">
            Today's Progress
          </h2>

          <span className="font-bold">
            {data.summary.todayProgress}%
          </span>

        </div>

        <div className="h-4 w-full rounded-full bg-gray-200">

          <div
            className="h-4 rounded-full bg-blue-600 transition-all"
            style={{
              width: `${data.summary.todayProgress}%`,
            }}
          />

        </div>

      </div>

      {/* Today's Karm */}

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Today's Karm
          </h2>

          <Link
            to="/habits"
            className="text-blue-600 hover:underline"
          >
            View All →
          </Link>

        </div>

        {data.todayHabits.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow">

            <p className="text-gray-500">
              No Karm for today.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {data.todayHabits.map(
              (habit: any) => (
                <HabitCard
                  key={habit.id}
                  title={habit.title}
                  completedValue={
                    habit.completedValue
                  }
                  targetValue={
                    habit.targetValue
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      {/* Top Streaks */}

      <div className="rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-bold">
          🔥 Top Streaks
        </h2>

        {data.topStreaks?.length ? (
          <div className="space-y-4">

            {data.topStreaks
              .slice(0, 5)
              .map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3 last:border-none"
                >

                  <div>

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Best{" "}
                      {item.bestStreak} days
                    </p>

                  </div>

                  <span className="text-lg font-bold">

                    🔥{" "}
                    {item.currentStreak}

                  </span>

                </div>
              ))}

          </div>
        ) : (
          <p className="text-gray-500">
            Complete a habit to begin
            building streaks.
          </p>
        )}

      </div>

      {/* Quick Actions */}

      <div className="flex flex-wrap gap-4">

        <Link
          to="/habits"
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          + Add Karm
        </Link>

        <Link
          to="/analytics"
          className="rounded-xl border px-6 py-3 hover:bg-gray-50"
        >
          View Analytics
        </Link>

      </div>

    </div>
  );
}