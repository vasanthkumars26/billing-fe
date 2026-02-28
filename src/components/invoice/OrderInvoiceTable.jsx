import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = "https://billing-be-gysy.onrender.com";

export default function OrderInvoiceTable({ filter = "all" }) {
  const [orderInvoices, setOrderInvoices] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/orderinvoices`)
      .then((res) => res.json())
      .then((data) => setOrderInvoices(data))
      .catch((err) => console.error("Fetch order invoices failed:", err));
  }, []);

  const deleteOrderInvoice = async (id) => {
    if (!window.confirm("Delete this order invoice?")) return;

    await fetch(`${BASE_URL}/api/orderinvoices/${id}`, {
      method: "DELETE",
    });

    setOrderInvoices(orderInvoices.filter((i) => i._id !== id));
  };

  const filtered =
    filter === "all"
      ? orderInvoices
      : orderInvoices.filter((i) => i.status === filter);

  return (
    <div className="bg-white shadow-lg rounded-lg p-3 sm:p-0">
      <div className="hidden sm:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Order ID</th>
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
                  No order invoices found
                </td>
              </tr>
            )}

            {filtered.map((inv) => (
              <tr key={inv._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{inv.orderId}</td>

                <td className="p-3 font-semibold">₹{inv.total}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      inv.status === "generated"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {inv.status?.toUpperCase()}
                  </span>
                </td>

                <td className="p-3">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 text-center space-x-2">
                  {/* VIEW */}
                  <Link
                    to={`/orderinvoice/${inv._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    View
                  </Link>

                  {/* DOWNLOAD PDF */}
                  {inv.pdfUrl && (
                    <a
                      href={`${BASE_URL}/${inv.pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gray-800 text-white rounded"
                    >
                      PDF
                    </a>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={() => deleteOrderInvoice(inv._id)}
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

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {filtered.map((inv) => (
          <div
            key={inv._id}
            className="border rounded-lg p-3 shadow-sm space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{inv.orderId}</span>
              <span className="font-semibold">₹{inv.total}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-600">
                {inv.status?.toUpperCase()}
              </span>

              <span className="text-gray-500">
                {new Date(inv.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Link
                to={`/orderinvoice/${inv._id}`}
                className="flex-1 text-center px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                View
              </Link>

              {inv.pdfUrl && (
                <a
                  href={`${BASE_URL}/${inv.pdfUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-3 py-1 bg-gray-800 text-white rounded text-sm"
                >
                  PDF
                </a>
              )}

              <button
                onClick={() => deleteOrderInvoice(inv._id)}
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