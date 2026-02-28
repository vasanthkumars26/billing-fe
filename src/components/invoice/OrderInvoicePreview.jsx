export default function OrderInvoicePreview({ invoice }) {
  if (!invoice) return null;

  const {
    _id,
    orderId,
    items = [],
    total,
    status,
    createdAt,
    customerName,
  } = invoice;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow text-sm print:text-black">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">ORDER INVOICE</h2>
          <p className="text-gray-500">Invoice ID: {_id}</p>
          <p className="text-gray-500">Order ID: {orderId}</p>
        </div>

        <div className="text-right">
          <p><b>Date:</b> {new Date(createdAt).toLocaleDateString()}</p>
          <p><b>Status:</b> {status}</p>
        </div>
      </div>

      {/* BILL TO */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Bill To</h3>
        <p className="font-medium">{customerName || "Customer"}</p>
        <p className="text-gray-500">Generated from order</p>
      </div>

      {/* ITEMS */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100 border">
            <th className="p-2 border text-left">Product</th>
            <th className="p-2 border text-center">Qty</th>
            <th className="p-2 border text-right">Price</th>
            <th className="p-2 border text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border text-center">{item.qty}</td>
              <td className="p-2 border text-right">₹{item.price}</td>
              <td className="p-2 border text-right">
                ₹{item.price * item.qty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL */}
      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-8 text-center text-gray-500 text-xs">
        <p>Thank you for your business!</p>
        <p>This invoice was generated from an order.</p>
      </div>
    </div>
  );
}