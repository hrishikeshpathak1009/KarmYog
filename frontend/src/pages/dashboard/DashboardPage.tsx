import SummaryCard from "../../components/dashboard/SummaryCard";
import HabitCard from "../../components/dashboard/HabitCard";

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../services/dashboard.service";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Failed to load dashboard</h1>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Good Morning 👋
        </h1>

        <p className="text-gray-500">
          Welcome back to KarmYog
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <SummaryCard
          title="Today's Progress"
          value={`${data.summary.todayProgress}%`}
        />

        <SummaryCard
          title="Current Streak"
          value={data.summary.currentStreak}
        />

        <SummaryCard
          title="Completed Today"
          value={`${data.summary.completedToday}/${data.summary.totalHabits}`}
        />

        <SummaryCard
          title="Weekly Progress"
          value={`${data.summary.weeklyCompletion}%`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Today's Habits
        </h2>

        {data.todayHabits.map((habit: any) => (
          <HabitCard
            key={habit.id}
            title={habit.title}
            completedValue={habit.completedValue}
            targetValue={habit.targetValue}
          />
        ))}
      </div>
    </div>
  );
}