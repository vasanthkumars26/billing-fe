export default function InvoicePreview({ invoice }) {
  if (!invoice || !invoice.items) {
    return <p>No invoice data available</p>;
  }

  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const taxPercent = invoice.tax || 0;
  const taxAmount = (subtotal * taxPercent) / 100;
  const discount = invoice.discount || 0;
  const total = subtotal + taxAmount - discount;

  return (
    <div
      id="invoice"
      className="bg-white p-4 sm:p-6 md:p-8 shadow rounded 
                 w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">A2V</h1>
          <p className="text-sm sm:text-base">123 Business Street</p>
          <p className="text-sm sm:text-base">GST: 22ABCDE1234F1Z5</p>
        </div>

        <div className="sm:text-right">
          <h2 className="text-lg sm:text-xl font-bold">INVOICE</h2>
          <p className="text-sm">Invoice ID: {invoice._id}</p>
          <p className="text-sm">Date: {invoice.date}</p>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-6">
        <h3 className="font-semibold">Bill To:</h3>
        <p>{invoice.clientName}</p>
      </div>

      {/* Items */}
      <div className="mb-6">
        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-center">Qty</th>
                <th className="border p-2 text-right">Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-center">{item.qty}</td>
                  <td className="border p-2 text-right">₹{item.price}</td>
                  <td className="border p-2 text-right">
                    ₹{item.qty * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {invoice.items.map((item, i) => (
            <div
              key={i}
              className="border rounded p-3 flex flex-col gap-1 text-sm"
            >
              <div className="font-semibold">{item.name}</div>
              <div className="flex justify-between">
                <span>Qty:</span>
                <span>{item.qty}</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span>₹{item.price}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{item.qty * item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full sm:w-64 space-y-1 text-sm sm:text-base">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax ({taxPercent}%):</span>
            <span>₹{taxAmount}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount:</span>
            <span>₹{discount}</span>
          </div>

          <div className="flex justify-between font-bold text-base sm:text-lg mt-2 border-t pt-2">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 text-center text-gray-500 text-sm">
        Thank you for your business!
      </div>
    </div>
  );
}