// src/services/orderService.js
import axios from "axios";

const LOCAL_URL = "http://localhost:5000";
const DEPLOYED_URL = "https://billing-be-gysy.onrender.com";
const BASE_URL = window.location.hostname.includes("localhost") ? LOCAL_URL : DEPLOYED_URL;

const API_URL = `${BASE_URL}/api/orders`;

export const placeOrder = async (orderData, token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.post(API_URL, orderData, { headers });
    return res.data;
  } catch (err) {
    console.error("placeOrder error:", err.response || err);
    throw err;
  }
};

export const getAllOrders = async (token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.get(`${API_URL}/admin/all`, { headers });
    return res.data || [];
  } catch (err) {
    console.error("getAllOrders error:", err.response || err);
    return []; // fallback to empty array
  }
};

export const updateOrderStatus = async (id, status, token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.put(`${API_URL}/${id}`, { status }, { headers });
    return res.data;
  } catch (err) {
    console.error("updateOrderStatus error:", err.response || err);
    throw err;
  }
};