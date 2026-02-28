import axios from "axios";
import { auth } from "../config/firebase";

const API = axios.create({
  baseURL: "https://billing-be-gysy.onrender.com",
});

API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = () => API.get("/api/products");
export const addProduct = (data) => API.post("/api/products", data);
export const updateProduct = (id, data) => API.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);