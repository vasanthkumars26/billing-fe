// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import InvoicePreview from "../components/invoice/InvoicePreview";

// const BASE_URL = "http://localhost:5000";

// export default function InvoiceView() {
//   const { id } = useParams(); // this must be INVOICE ID
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/invoices/${id}`);

//         if (!res.ok) {
//           throw new Error("Invoice not found");
//         }

//         const data = await res.json();

//         // 🔥 validate structure
//         if (!data || !data.items || data.items.length === 0) {
//           throw new Error("Invalid invoice data");
//         }

//         setInvoice(data);
//       } catch (err) {
//         console.error("Fetch invoice failed:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoice();
//   }, [id]);

//   const handlePrint = () => window.print();

//   if (loading) return <p className="p-4">Loading invoice...</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;
//   if (!invoice) return <p className="p-4">Invoice not found</p>;

//   return (
//     <div className="flex min-h-screen">
//       <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-100 relative">
        
//         {/* Back Button */}
//         <p
//           onClick={() => navigate("/invoices")}
//           className="absolute top-3 left-3 bg-red-300 px-2 py-1 
//                      hover:cursor-pointer hover:bg-red-600 hover:text-white 
//                      font-semibold rounded"
//         >
//           X
//         </p>

//         {/* Header */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 mt-10">
//           <h1 className="text-xl sm:text-2xl font-bold">Invoice</h1>

//           <button
//             onClick={handlePrint}
//             className="bg-black text-white px-3 py-2 rounded"
//           >
//             Print Invoice
//           </button>
//         </div>

//         {/* Invoice Preview */}
//         <div className="overflow-x-auto">
//           <InvoicePreview invoice={invoice} />
//         </div>
//       </main>
//     </div>
//   );
// }

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InvoicePreview from "../components/invoice/InvoicePreview";

const BASE_URL = "https://billing-be-gysy.onrender.com";

export default function InvoiceView() {
  const { id } = useParams(); // INVOICE _id
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/invoices/${id}`);

        if (!res.ok) {
          throw new Error("Invoice not found");
        }

        const data = await res.json();

        // ✅ Only check minimum
        if (!data || !data._id) {
          throw new Error("Invalid invoice data");
        }

        setInvoice(data);
      } catch (err) {
        console.error("Fetch invoice failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => window.print();

  if (loading) return <p className="p-4">Loading invoice...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!invoice) return <p className="p-4">Invoice not found</p>;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-100 relative">

        {/* Back Button */}
        <p
          onClick={() => navigate("/invoices")}
          className="absolute top-3 left-3 bg-red-300 px-2 py-1 
                     hover:cursor-pointer hover:bg-red-600 hover:text-white 
                     font-semibold rounded"
        >
          X
        </p>

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 mt-10">
          <h1 className="text-xl sm:text-2xl font-bold">Invoice</h1>

          <button
            onClick={handlePrint}
            className="bg-black text-white px-3 py-2 rounded"
          >
            Print Invoice
          </button>
        </div>

        {/* Invoice Preview */}
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <InvoicePreview invoice={invoice} />
        </div>

      </main>
    </div>
  );
}