interface SummaryCardProps {
  title: string;
  value: string | number;
}

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl bg-white p-2 md:p-4 shadow">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="mt-2 text-xl md:text-3x1 font-bold">
        {value}
      </h2>
    </div>
  );
}