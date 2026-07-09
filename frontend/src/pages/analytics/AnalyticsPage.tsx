import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "../../services/analytics.service";

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-white p-3 shadow">
      <h3 className="text-gray-500">{title}</h3>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default function AnalyticsPage() {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading Analytics...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Understand your consistency and
          progress.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <SummaryCard
          title="Today's Progress"
          value={`${data.summary.todayProgress}%`}
        />

        <SummaryCard
          title="Completion Rate"
          value={`${data.summary.completionRate}%`}
        />

        <SummaryCard
          title="Current Streak"
          value={data.summary.currentStreak}
        />

        <SummaryCard
          title="Karm Score"
          value={data.summary.karmScore}
        />

      </div>

      {/* Weekly Chart */}

      <div className="rounded-2xl bg-white p-3 md:p-6 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Weekly Progress
        </h2>

        <ResponsiveContainer
          width="100%"
          height={200} 
        >
          <LineChart
            data={data.weeklyTrend}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Monthly Chart */}

      <div className="rounded-2xl bg-white p-3 md:p-6 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Monthly Progress
        </h2>

        <ResponsiveContainer
          width="100%"
          height={200}
        >
          <BarChart
            data={data.monthlyTrend}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              hide
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="completed"
              fill="#16a34a"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Heatmap */}

      <div className="rounded-2xl bg-white p-3 md:p-6 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Contribution Heatmap
        </h2>

        <div className="flex flex-wrap gap-2">

          {data.heatmap.map(
            (
              cell: any,
              index: number
            ) => (
              <div
                key={index}
                title={cell.date}
                className={`h-5 w-5 rounded-sm ${
                  cell.level === 0
                    ? "bg-gray-200"
                    : cell.level === 1
                    ? "bg-green-200"
                    : cell.level === 2
                    ? "bg-green-400"
                    : cell.level === 3
                    ? "bg-green-600"
                    : "bg-green-800"
                }`}
              />
            )
          )}

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-4 md:gap-6">

        <SummaryCard
          title="Total Karm"
          value={data.summary.totalKarm}
        />

        <SummaryCard
          title="Completed Today"
          value={data.summary.completedToday}
        />

        <SummaryCard
          title="Total Logs"
          value={data.summary.totalLogs}
        />

      </div>

    </div>
  );
}