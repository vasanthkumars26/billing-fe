import { useState } from "react";
import InvoiceItemRow from "./InvoiceItemRow";
import { calculateTotal } from "../../utils/calculateTotal";
import { useInvoice } from "../../context/InvoiceContext";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const { addInvoice } = useInvoice();

  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState("unpaid");
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate()

  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const total = calculateTotal(items, tax, discount);

  const handleAddItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  const handleItemChange = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientName) {
      alert("Client name is required");
      return;
    }

    const invoice = {
      clientName,
      items,
      tax,
      discount,
      subtotal,
      total,
      status,
      date: new Date().toISOString().split("T")[0],
    };

    addInvoice(invoice);

    // reset form
    setClientName("");
    setItems([{ name: "", qty: 1, price: 0 }]);
    setTax(0);
    setDiscount(0);
    setStatus("unpaid");

    alert("Invoice created successfully!");
  };

  return (
    <div>
     <div> <p
        onClick={() => navigate("/admin")}
        className="w-fit bg-red-300 m-3 px-2 py-1 hover:cursor-pointer hover:bg-red-600 hover:text-white font-semibold rounded"
      >
        X
      </p></div>
    <div><form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-3xl"
    >
      <h2 className="text-xl font-bold mb-4">Create Invoice</h2>
       

      {/* Client & Status */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Items */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Items</h3>
        {items.map((item, i) => (
          <InvoiceItemRow
            key={i}
            item={item}
            onChange={(updated) => handleItemChange(i, updated)}
            onRemove={() => handleRemoveItem(i)}
          />
        ))}

        <button
          type="button"
          onClick={handleAddItem}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Item
        </button>
      </div>

      {/* Tax & Discount */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          placeholder="Tax %"
          className="border p-2 rounded"
          value={tax}
          onChange={(e) => setTax(+e.target.value)}
        />
        <input
          type="number"
          placeholder="Discount"
          className="border p-2 rounded"
          value={discount}
          onChange={(e) => setDiscount(+e.target.value)}
        />
      </div>

      {/* Summary */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax: {tax}%</p>
        <p>Discount: ₹{discount}</p>
        <p className="font-bold text-lg">Total: ₹{total}</p>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Invoice
      </button>
    </form></div></div>
  );
};

export default InvoiceForm;