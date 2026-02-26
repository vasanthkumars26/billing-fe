import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import { useInvoice } from "../context/InvoiceContext";

const Dashboard = () => {
  const { invoices = [] } = useInvoice();

  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(i => i.status === "paid");
  const unpaidInvoices = invoices.filter(i => i.status === "unpaid");

  const totalPaidRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalUnpaidRevenue = unpaidInvoices.reduce((sum, i) => sum + i.total, 0);

  // Revenue grouped by date (paid + unpaid separately)
  const revenueByDate = {};

  invoices.forEach(inv => {
    if (!revenueByDate[inv.date]) {
      revenueByDate[inv.date] = { paid: 0, unpaid: 0 };
    }

    if (inv.status === "paid") {
      revenueByDate[inv.date].paid += inv.total;
    }

    if (inv.status === "unpaid") {
      revenueByDate[inv.date].unpaid += inv.total;
    }
  });

  const chartData = Object.keys(revenueByDate)
    .slice(-7)
    .map(date => ({
      date,
      paid: revenueByDate[date].paid,
      unpaid: revenueByDate[date].unpaid
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Invoices" value={totalInvoices} />
        <StatCard title="Paid Invoices" value={paidInvoices.length} color="green" />
        <StatCard title="Unpaid Invoices" value={unpaidInvoices.length} color="red" />
        <StatCard title="Paid Revenue" value={`₹${totalPaidRevenue}`} color="purple" />
      </div>

      {/* Chart */}
      <RevenueChart data={chartData} />
    </div>
  );
};

export default Dashboard;