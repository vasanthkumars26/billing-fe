import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://billing-be-gysy.onrender.com";

export default function OrderInvoiceList() {
  const [orderInvoices, setOrderInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderInvoices = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/orderinvoices`);

        if (!res.ok) {
          throw new Error("Failed to fetch order invoices");
        }

        const data = await res.json();
        setOrderInvoices(data);
      } catch (err) {
        console.error("Fetch order invoices error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderInvoices();
  }, []);

  if (loading) return <p className="p-6">Loading order invoices...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-4 sm:p-6">
      <p
        onClick={() => navigate("/admin")}
        className="w-fit bg-red-300 px-2 py-1 hover:cursor-pointer hover:bg-red-600 hover:text-white font-semibold rounded"
      >
        X
      </p>

      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Order Invoices
      </h1>

      {/* ✅ MOBILE VIEW */}
      <div className="sm:hidden space-y-3">
        {orderInvoices.length === 0 ? (
          <p className="text-center p-4">No order invoices found</p>
        ) : (
          orderInvoices.map((inv, index) => (
            <div key={inv._id} className="bg-white p-4 rounded shadow">
              <p><b>#:</b> {index + 1}</p>
              <p><b>Order ID:</b> {inv.orderId}</p>
              <p><b>Total:</b> ₹{inv.total}</p>
              <p><b>Status:</b> {inv.status}</p>
              <p><b>Date:</b> {new Date(inv.createdAt).toLocaleDateString()}</p>

              <button
                onClick={() => navigate(`/orderinvoice/${inv._id}`)}
                className="mt-2 w-full bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                View
              </button>
            </div>
          ))
        )}
      </div>

      {/* ✅ DESKTOP VIEW */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">#</th>
              <th className="px-3 py-2 border">Order ID</th>
              <th className="px-3 py-2 border">Total</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {orderInvoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No order invoices found
                </td>
              </tr>
            ) : (
              orderInvoices.map((inv, index) => (
                <tr key={inv._id} className="text-center">
                  <td className="px-3 py-2 border">{index + 1}</td>
                  <td className="px-3 py-2 border">{inv.orderId}</td>
                  <td className="px-3 py-2 border">₹{inv.total}</td>
                  <td className="px-3 py-2 border">{inv.status}</td>
                  <td className="px-3 py-2 border">
                    {new Date(inv.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 border">
                    <button
                      onClick={() => navigate(`/orderinvoice/${inv._id}`)}
                      className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}