interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export default function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div className="card-heal p-6 group cursor-default">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm text-stone-500 font-medium">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-stone-800 tracking-tight">
          {value}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            trend === "up"
              ? "text-emerald-700 bg-emerald-50"
              : "text-rose-600 bg-rose-50"
          }`}
        >
          {trend === "up" ? (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17l5-5 5 5M7 7l5 5 5-5" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 7l-5 5-5-5M17 17l-5-5-5 5" />
            </svg>
          )}
          {change}
        </span>
      </div>
    </div>
  );
}
