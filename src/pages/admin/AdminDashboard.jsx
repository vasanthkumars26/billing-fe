import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import axios from "axios";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../services/productService";
import { getAllOrders, updateOrderStatus as updateOrderStatusService } from "../../services/orderService";
import { useInvoice } from "../../context/InvoiceContext";
import { Link } from "react-router-dom";

const LOCAL_URL = "http://localhost:5000";
const DEPLOYED_URL = "https://billing-be-delta.vercel.app";
const BASE_URL = window.location.hostname.includes("localhost") ? LOCAL_URL : DEPLOYED_URL;
const socket = io(BASE_URL, { transports: ["websocket", "polling"] });
const MAX_ORDERS = 50;

export default function AdminDashboard() {
  const { addInvoiceFromOrder } = useInvoice();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 🔔 Notification sources
  const [enquiries, setEnquiries] = useState([]);      // for /enquiries
  const [createInvoice, setCreateInvoice] = useState([]); // for /create-invoice
  const [invoices, setInvoices] = useState([]);        // for /invoices & /orderinvoices

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      const res = await getProducts(BASE_URL);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      const data = await getAllOrders();
      setOrders(data.slice(0, MAX_ORDERS));

      // reuse orders count for notifications
      setCreateInvoice(data || []);
      setInvoices(data || []);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    let pendingUpdates = [];

    const flushUpdates = () => {
      if (!pendingUpdates.length) return;
      setOrders((prev) => {
        let newOrders = [...pendingUpdates, ...prev];
        if (newOrders.length > MAX_ORDERS) newOrders = newOrders.slice(0, MAX_ORDERS);
        return newOrders;
      });
      pendingUpdates = [];
    };

    socket.on("newOrder", (order) => {
      pendingUpdates.push(order);
      setTimeout(flushUpdates, 100);
    });

    socket.on("updateOrder", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    loadProducts();
    loadOrders();

    return () => {
      socket.off("newOrder");
      socket.off("updateOrder");
    };
  }, [loadProducts, loadOrders]);

  const resetForm = () => {
    setName(""); setPrice(""); setImage(null); setPreview(null); setEditingId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      if (editingId) await updateProduct(editingId, formData, BASE_URL);
      else await addProduct(formData, BASE_URL);
      resetForm();
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setName(p.name);
    setPrice(p.price);
    setPreview(p.image?.startsWith("http") ? p.image : `${BASE_URL}/${p.image}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await deleteProduct(id, BASE_URL);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const updated = await updateOrderStatusService(orderId, status);
      setOrders((prev) => prev.map((o) => (o._id === orderId ? updated : o)));
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  const generateInvoice = async (orderId) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/orderinvoices/generate/${orderId}`);
      const updatedOrder = res.data;
      setOrders((prev) => prev.map((o) => (o._id === orderId ? updatedOrder : o)));
      addInvoiceFromOrder(updatedOrder);
      alert("Invoice generated and added to Invoice Table!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate invoice");
    }
  };

  const downloadInvoice = (pdfUrl) => {
    if (!pdfUrl) return alert("Invoice not generated yet!");
    window.open(`${BASE_URL}/${pdfUrl}`, "_blank");
  };

  const getImageUrl = (img) =>
    !img ? "/fallback-image.png" : img.startsWith("http") ? img : `${BASE_URL}/${img}`;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className={`bg-white shadow-lg p-4 transition-all duration-300 ${sidebarOpen ? "w-full md:w-64" : "w-16"}`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4 text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
          {sidebarOpen ? "Collapse" : "Expand"}
        </button>

        {sidebarOpen && (
          <div className="space-y-4">
            <p className="font-semibold text-lg">Admin Panel</p>
            <p className="text-sm text-gray-500">Manage products & orders</p>

            <nav className="flex flex-col gap-2 pt-2">

              <Link to="/dashboard" className="p-2 rounded hover:bg-gray-200">Dashboard</Link>
              <Link to="/admin" className="p-2 rounded hover:bg-gray-200">Products & Orders</Link>

              {/* ORDER INVOICES */}
              <Link to="/orderinvoices" className="flex items-center justify-between p-2 rounded hover:bg-gray-200">
                <span>Order Invoices</span>
                {invoices.length > 0 && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {invoices.length}
                  </span>
                )}
              </Link>

              {/* ENQUIRIES */}
              <Link to="/enquiries" className="flex items-center justify-between p-2 rounded hover:bg-gray-200">
                <span>Enquiries</span>
                {enquiries.length > 0 && (
                  <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {enquiries.length}
                  </span>
                )}
              </Link>

              {/* CREATE INVOICE */}
              <Link to="/create-invoice" className="flex items-center justify-between p-2 rounded hover:bg-gray-200">
                <span>Create Invoice</span>
                {createInvoice.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {createInvoice.length}
                  </span>
                )}
              </Link>

              {/* INVOICES */}
              <Link to="/invoices" className="flex items-center justify-between p-2 rounded hover:bg-gray-200">
                <span>Invoices</span>
                {invoices.length > 0 && (
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {invoices.length}
                  </span>
                )}
              </Link>

            </nav>
          </div>
        )}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <motion.form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mb-6">
          <h2 className="text-xl font-semibold">{editingId ? "Edit Product" : "Add Product"}</h2>
          <input className="border p-2 w-full rounded" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="border p-2 w-full rounded" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} className="h-32 rounded mt-2 object-cover" />}
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            {editingId ? "Update" : "Add"}
          </button>
        </motion.form>

        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <AnimatePresence>
            {products.map((p) => (
              <motion.div key={p._id} className="border p-4 rounded shadow bg-white">
                <img src={getImageUrl(p.image)} className="h-32 w-full object-cover rounded mb-2" />
                <h3 className="font-semibold">{p.name}</h3>
                <p>₹{p.price}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(p)} className="bg-blue-600 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white p-4 rounded shadow">
              <p><b>User:</b> {o.userName || o.userEmail}</p>
              <p><b>Total:</b> ₹{o.total}</p>
              <select value={o.status} onChange={(e) => updateOrderStatus(o._id, e.target.value)} className="border p-1 mt-2">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>

              <div className="flex gap-2 mt-2">
                <button onClick={() => generateInvoice(o._id)} className="bg-green-600 text-white px-3 py-1 rounded">Generate Invoice</button>
                {o.pdfUrl && <button onClick={() => downloadInvoice(o.pdfUrl)} className="bg-gray-800 text-white px-3 py-1 rounded">Download PDF</button>}
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}