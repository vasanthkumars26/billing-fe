export default function RevenueChart({ data = [] }) {
  const dateColors = [
    "#3B82F6", // blue
    "#22C55E", // green
    "#F59E0B", // yellow
    "#8B5CF6", // purple
    "#06B6D4", // cyan
    "#EC4899", // pink
  ];

  const unpaidColor = "#991B1B"; // dark red

  // Build chart slices: one slice per date (paid) + one unpaid slice
  const paidSlices = data.map((d, i) => ({
    label: d.date,
    value: d.paid,
    color: dateColors[i % dateColors.length],
  }));

  const totalUnpaid = data.reduce((sum, d) => sum + d.unpaid, 0);

  const chartData = [
    ...paidSlices,
    { label: "Unpaid", value: totalUnpaid, color: unpaidColor },
  ];

  const grandTotal = chartData.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;

  const slices = chartData.map((d) => {
    const start = cumulative / grandTotal;
    const value = d.value / grandTotal;
    cumulative += d.value;
    return { ...d, start, value };
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col lg:flex-row gap-6">
      {/* Chart */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-40 h-40 sm:w-52 sm:h-52">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {slices.map((slice, i) => (
              <circle
                key={i}
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                stroke={slice.color}
                strokeWidth="4"
                strokeDasharray={`${slice.value * 100} ${100 - slice.value * 100}`}
                strokeDashoffset={-slice.start * 100}
                className="transition-all duration-700 ease-out"
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm text-gray-500">Total</p>
            <p className="text-lg sm:text-xl font-bold">₹{grandTotal}</p>
          </div>
        </div>

        {/* Summary Legend */}
        <div className="space-y-2 w-full max-w-xs">
          <h3 className="font-semibold text-center sm:text-left">
            Revenue Summary
          </h3>

          {chartData.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: d.color }}
              ></span>
              <span>{d.label}</span>
              <span className="font-semibold ml-auto">₹{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Paid by Date */}
      <div className="space-y-2 w-full max-w-sm ">
        <h3 className="font-semibold text-center lg:text-left">
          Paid Revenue by Date
        </h3>

        {data.map((d, i) => {
          const color = dateColors[i % dateColors.length];

          return (
            <div key={i} className="flex items-center gap-2 text-sm border-b pb-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <span className="text-gray-600">{d.date}</span>
              <span className="font-semibold ml-auto" style={{ color }}>
                ₹{d.paid}
              </span>
            </div>
          );
        })}

        {data.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No revenue data available
          </p>
        )}
      </div>
    </div>
  );
}