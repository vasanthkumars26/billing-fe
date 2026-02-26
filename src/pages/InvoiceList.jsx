import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import InvoiceTable from "../components/invoice/InvoiceTable";

export default function InvoiceList() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex">
      
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <select
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <InvoiceTable filter={filter} />
      </main>
    </div>
  );
}