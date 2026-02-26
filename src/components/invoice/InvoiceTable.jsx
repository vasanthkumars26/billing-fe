import { Link } from "react-router-dom";
import { useInvoice } from "../../context/InvoiceContext";

export default function InvoiceTable({ filter }) {
  const { invoices = [], deleteInvoice } = useInvoice();

  const filtered =
    filter === "all"
      ? invoices
      : invoices.filter((i) => i.status === filter);

  return (
    <div className="bg-white shadow-lg rounded-lg p-3 sm:p-0">
      {/* Desktop Table */}
      <div className="hidden sm:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No invoices found
                </td>
              </tr>
            )}

            {filtered.map((inv) => (
              <tr key={inv._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{inv.clientName}</td>
                <td className="p-3 font-semibold">₹{inv.total}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      inv.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {inv.status.toUpperCase()}
                  </span>
                </td>

                <td className="p-3">{inv.date}</td>

                <td className="p-3 text-center space-x-2">
                  <Link
                    to={`/invoice/${inv._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => deleteInvoice(inv._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No invoices found</p>
        )}

        {filtered.map((inv) => (
          <div
            key={inv._id}
            className="border rounded-lg p-3 shadow-sm space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{inv.clientName}</span>
              <span className="font-semibold">₹{inv.total}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  inv.status === "paid"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {inv.status.toUpperCase()}
              </span>
              <span className="text-gray-500">{inv.date}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <Link
                to={`/invoice/${inv._id}`}
                className="flex-1 text-center px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                View
              </Link>

              <button
                onClick={() => deleteInvoice(inv._id)}
                className="flex-1 px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}