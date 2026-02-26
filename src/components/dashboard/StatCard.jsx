export default function StatCard({ title, value, color = "blue" }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold text-${color}-600 mt-1`}>
        {value}
      </h2>
    </div>
  );
}