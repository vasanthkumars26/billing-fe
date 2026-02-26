import axios from "axios";

const API = "http://localhost:5000/api/invoices";

export const getInvoices = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createInvoice = async (invoice) => {
  const res = await axios.post(API, invoice);
  return res.data;
};

export const deleteInvoiceApi = async (id) => {
  await axios.delete(`${API}/${id}`);
};

export const updateInvoiceApi = async (id, invoice) => {
  const res = await axios.put(`${API}/${id}`, invoice);
  return res.data;
};