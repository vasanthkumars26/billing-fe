import { createContext, useContext, useEffect, useState } from "react";
import {
  getInvoices,
  createInvoice,
  deleteInvoiceApi,
  updateInvoiceApi
} from "../services/invoiceService";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const data = await getInvoices();
    setInvoices(data);
  };

  const addInvoice = async (invoice) => {
    const saved = await createInvoice(invoice);
    setInvoices([...invoices, saved]);
  };

  // ✅ New: Add invoice directly from order (for admin dashboard)
  const addInvoiceFromOrder = (order) => {
    // order should have _id, pdfUrl, userName/userEmail, total, items
    const invoice = {
      _id: order._id,
      clientName: order.userName || order.userEmail,
      total: order.total,
      status: "pending",
      date: new Date().toLocaleDateString(),
      pdfUrl: order.pdfUrl,
      items: order.items
    };
    setInvoices((prev) => [...prev, invoice]);
  };

  const deleteInvoice = async (id) => {
    await deleteInvoiceApi(id);
    setInvoices(invoices.filter((inv) => inv._id !== id));
  };

  const updateInvoice = async (updatedInvoice) => {
    const data = await updateInvoiceApi(updatedInvoice._id, updatedInvoice);
    setInvoices(invoices.map((inv) => (inv._id === data._id ? data : inv)));
  };

  return (
    <InvoiceContext.Provider
      value={{ invoices, addInvoice, addInvoiceFromOrder, deleteInvoice, updateInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);