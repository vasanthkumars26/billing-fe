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
      value={{ invoices, addInvoice, deleteInvoice, updateInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);