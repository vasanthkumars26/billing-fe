// src/services/orderService.js
import axios from "axios";

// Place a new order
export const placeOrder = async (orderData, token, BASE_URL) => {
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    const response = await axios.post(`${BASE_URL}/api/orders`, orderData, config);

    // Return the created order object
    return response.data;
  } catch (err) {
    console.error("placeOrder error:", err.response || err);
    throw err;
  }
};

// Get all orders (for admin)
export const getAllOrders = async (BASE_URL, token) => {
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    const response = await axios.get(`${BASE_URL}/api/orders/admin/all`, config);
    return response.data;
  } catch (err) {
    console.error("getAllOrders error:", err.response || err);
    throw err;
  }
};

// Update order status (admin)
export const updateOrderStatus = async (orderId, status, token, BASE_URL) => {
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    const response = await axios.put(`${BASE_URL}/api/orders/${orderId}`, { status }, config);
    return response.data;
  } catch (err) {
    console.error("updateOrderStatus error:", err.response || err);
    throw err;
  }
};