import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import InvoicePreview from "../components/invoice/InvoicePreview";

export default function InvoiceView() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://billing-be-gysy.onrender.com/api/invoices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInvoice(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p className="p-4 sm:p-6">Loading invoice...</p>;
  if (!invoice) return <p className="p-4 sm:p-6">Invoice not found</p>;

  return (
    <div className="flex min-h-screen">
      

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-100 relative">
        
        {/* Back Button */}
        <p
          onClick={() => navigate("/invoices")}
          className="group absolute top-3 left-3 sm:top-4 sm:left-4 
                     bg-red-300 px-2 py-1 hover:cursor-pointer 
                     hover:animate-pulse text-black hover:bg-red-600 
                     hover:text-white font-semibold rounded"
        >
          X
          <span className="absolute -bottom-6 left-1 text-xs sm:text-sm 
                           text-black font-thin border px-1 bg-white 
                           hidden group-hover:block">
            back
          </span>
        </p>

        {/* Header */}
        <div className=" flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 mt-10 sm:mt-0">
          <h1 className="text-xl sm:text-2xl font-bold mt-10">Invoice</h1>

          <button
            onClick={handlePrint}
            className="bg-black text-white px-3 py-2 sm:px-4 rounded w-full sm:w-auto"
          >
            Print Invoice
          </button>
        </div>

        {/* Invoice Preview wrapper */}
        <div className="overflow-x-auto">
          <InvoicePreview invoice={invoice} />
        </div>
      </main>
    </div>
  );
}