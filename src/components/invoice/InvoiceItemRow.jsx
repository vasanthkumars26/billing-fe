const InvoiceItemRow = ({ item, onChange, onRemove }) => {
  return (
    <div className="grid grid-cols-4 gap-2 mb-2">
      <input
        type="text"
        placeholder="Item name"
        className="border p-2 rounded"
        value={item.name}
        onChange={(e) => onChange({ ...item, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Qty"
        className="border p-2 rounded"
        value={item.qty}
        onChange={(e) => onChange({ ...item, qty: +e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        className="border p-2 rounded"
        value={item.price}
        onChange={(e) => onChange({ ...item, price: +e.target.value })}
      />
      <button
        type="button"
        onClick={onRemove}
        className="bg-red-500 text-white rounded px-2"
      >
        ✕
      </button>
    </div>
  );
};

export default InvoiceItemRow;