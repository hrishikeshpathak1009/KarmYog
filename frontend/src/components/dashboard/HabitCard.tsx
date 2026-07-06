interface HabitCardProps {
  title: string;
  completedValue: number;
  targetValue: number;
}

export default function HabitCard({
  title,
  completedValue,
  targetValue,
}: HabitCardProps) {

  const progress = Math.min(
    100,
    Math.round(
      (completedValue / targetValue) * 100
    )
  );

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="font-semibold">
          {title}
        </h2>

        <span className="text-sm text-gray-500">
          {completedValue}/{targetValue}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full bg-blue-600"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}