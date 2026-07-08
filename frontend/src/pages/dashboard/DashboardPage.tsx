import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnalytics } from "../../services/analytics.service";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

import SummaryCard from "../../components/dashboard/SummaryCard";
//import HabitCard from "../../components/dashboard/HabitCard";

import { getDashboard } from "../../services/dashboard.service";

import {
  incrementHabit,
  decrementHabit,
  completeHabit,
} from "../../services/karm.service";

export default function DashboardPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
  const { data: analytics } = useQuery({
  queryKey: ["analytics"],
  queryFn: getAnalytics,
});

  const incrementMutation = useMutation({
    mutationFn: incrementHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });

  const decrementMutation = useMutation({
    mutationFn: decrementHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
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

  const longest = data.topStreaks?.[0];
console.log(data);
 const weeklyData =
  analytics?.weeklyTrend?.map((d: any) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString(
      "en-IN",
      {
        month: "short",
        day: "numeric",
      }
    ),
  })) ?? [];

  return (
    <div className="space-y-8">

      {/* Hero Quote */}

      <div className="rounded-2x2 bg-gradient-to-r from-blue-50 to-amber-50 p-6 shadow">

        <p className="text-center text-2xl leading-relaxed font-semibold text-orange-900">

          हनूमान तेहि परसा कर पुनि कीन्ह प्रनाम।
          <br />
          राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम॥

        </p>

        <p className="mt-4 text-right text-gray-60">

          — गोस्वामी तुलसीदास, श्रीरामचरितमानस (सुंदरकांड, दोहा 1)

        </p>

      </div>

      {/* Hero Progress */}

      <div className="rounded-3xl bg-white p-4 shadow">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Today's Progress
            </h2>

            <p className="mt-2 text-gray-500">

              {data.summary.completedToday} of{" "}
              {data.summary.totalKarm} Karm completed

            </p>

          </div>

          <div className="text-3xl font-bold text-blue-600">

            {data.summary.todayProgress}%

          </div>

        </div>

        <div className="mt-8 h-5 w-full rounded-full bg-gray-200">

          <div
            className="h-5 rounded-full bg-blue-600 transition-all duration-500"
            style={{
              width: `${data.summary.todayProgress}%`,
            }}
          />

        </div>

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

      {/* Weekly Graph */}

      <div className="rounded-3xl bg-white p-5 shadow">

        <h2 className="mb-6 text-2xl font-bold">

          Weekly Progress

        </h2>

        <ResponsiveContainer
          width="100%"
          height={200}
        >
          <LineChart data={weeklyData}>

            <XAxis dataKey="date" />
            

            <Tooltip />

            <Line
              type="monotone"
              dataKey="completed"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Today's Karm */}

      <div>

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold">

            Today's Karm

          </h2>

          <Link
            to="/habits"
            className="text-blue-600 hover:underline"
          >
            Manage →
          </Link>

        </div>

        <div className="space-y-5">

          {data.todayHabits.map((karm: any) => {

            const progress =
              Math.min(
                100,
                Math.round(
                  (karm.completedValue /
                    Math.max(
                      karm.targetValue,
                      1
                    )) *
                    100
                )
              );

            return (<div
  key={karm.id}
  className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
>
  <div className="flex items-center justify-between">

    <div>

      <h3 className="text-2xl font-semibold">
        {karm.title}
      </h3>

      {karm.completed ? (
        <p className="mt-2 text-green-600">
          ✓ Completed Today
        </p>
      ) : (
        <p className="mt-2 text-gray-500">
          {karm.completedValue} /{" "}
          {karm.targetValue}
        </p>
      )}

    </div>

    {karm.completed && (
      <div className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
        Completed
      </div>
    )}

  </div>

  {!karm.completed && (
    <>
      <div className="mt-5">

        <div className="h-3 w-full rounded-full bg-gray-200">

          <div
            className="h-3 rounded-full bg-blue-600 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() =>
            decrementMutation.mutate(
              karm.id
            )
          }
          className="rounded-xl bg-gray-200 px-5 py-2 text-xl hover:bg-gray-300"
        >
          −
        </button>

        <button
          onClick={() =>
            incrementMutation.mutate(
              karm.id
            )
          }
          className="rounded-xl bg-blue-600 px-5 py-2 text-xl text-white hover:bg-blue-700"
        >
          +
        </button>

        <button
          onClick={() =>
            completeMutation.mutate(
              karm.id
            )
          }
          className="rounded-xl bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >
          Complete
        </button>

      </div>
    </>
  )}

</div>

);
})}

</div>

</div>

{/* Top Streaks */}

<div className="rounded-3xl bg-white p-8 shadow">

<h2 className="mb-6 text-2xl font-bold">

🔥 Top Streaks

</h2>

{data.topStreaks.length === 0 ? (

<p className="text-gray-500">

Complete a habit to begin building streaks.

</p>

) : (

<div className="space-y-4">

{data.topStreaks
.slice(0, 3)
.map((streak: any, index: number) => (

<div
key={streak.id}
className="flex items-center justify-between rounded-xl border p-4"
>

<div>

<p className="text-xl font-semibold">

{index === 0 && "🥇 "}
{index === 1 && "🥈 "}
{index === 2 && "🥉 "}

{streak.title}

</p>

<p className="text-sm text-gray-500">

Best {streak.bestStreak} days

</p>

</div>

<div className="text-2xl font-bold text-orange-600">

🔥 {streak.currentStreak}

</div>

</div>

))}

</div>

)}

</div>

{/* Quick Actions */}

<div className="flex flex-wrap gap-4">

<Link
to="/habits"
className="rounded-2xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
>

+ Add Karm

</Link>

<Link
to="/analytics"
className="rounded-2xl border px-8 py-3 hover:bg-gray-100"
>

View Analytics →

</Link>

</div>

</div>

);

}