import SummaryCard from "../../components/dashboard/SummaryCard";
import HabitCard from "../../components/dashboard/HabitCard";

export default function DashboardPage() {
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

        <SummaryCard title="Today's Progress" value="72%" />
        <SummaryCard title="Current Streak" value="14" />
        <SummaryCard title="Completed Today" value="6 / 8" />
        <SummaryCard title="Weekly Progress" value="82%" />

      </div>

      <div className="space-y-4">

        <h2 className="text-2xl font-bold">
          Today's Habits
        </h2>

        <HabitCard
          title="Workout"
          completedValue={45}
          targetValue={60}
        />

        <HabitCard
          title="Drink Water"
          completedValue={2400}
          targetValue={3000}
        />

        <HabitCard
          title="Reading"
          completedValue={18}
          targetValue={20}
        />

      </div>

    </div>
  );
}