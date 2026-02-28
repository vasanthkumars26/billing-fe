// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://billing-be-delta.vercel.app";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user, token, loading } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const generateInvoice = (orderData) => {
    const html = `
      <html>
        <head>
          <title>Invoice</title>
        </head>
        <body style="font-family: Arial; padding: 20px;">
          <h1>Invoice</h1>
          <p><b>Name:</b> ${orderData.userName}</p>
          <p><b>Email:</b> ${orderData.userEmail}</p>
          <p><b>Address:</b> ${orderData.address}</p>
          <hr/>
          ${orderData.items
            .map(
              (i) =>
                `<p>${i.name} - Qty: ${i.qty} - ₹${i.price}</p>`
            )
            .join("")}
          <hr/>
          <h2>Total: ₹${orderData.total}</h2>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    return URL.createObjectURL(blob);
  };

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please enter your address");
    setSubmitting(true);

    try {
      const orderData = {
        userId: user?.uid,
        userName: name,
        userEmail: email,
        address,
        total,
        status: "pending",
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          image: item.image,
        })),
      };

      await placeOrder(orderData, token, BASE_URL);

      const invoice = generateInvoice(orderData);
      setInvoiceUrl(invoice);
      setShowInvoice(true);

      clearCart();
      setAddress("");

      setTimeout(() => {
        setShowInvoice(false);
      }, 10000);
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading user info...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 relative">
      <h1 className="text-2xl font-bold text-center">Checkout</h1>

      <AnimatePresence>
        {showInvoice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-5 right-5 bg-green-600 text-white p-4 rounded shadow-lg z-50"
          >
            <p className="font-semibold">Order placed successfully 🎉</p>
            <a
              href={invoiceUrl}
              download="invoice.html"
              className="underline mt-2 block"
            >
              Download Invoice
            </a>
            <p className="text-xs mt-1">(Available for 10 seconds)</p>
          </motion.div>
        )}
      </AnimatePresence>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-center border p-3 rounded shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.image
                        ? item.image.startsWith("http")
                          ? item.image
                          : `${BASE_URL}/${item.image}`
                        : "/fallback-image.png"
                    }
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>₹{item.price}</p>
                  </div>
                </div>
                <p className="font-semibold">Qty: {item.qty}</p>
              </motion.div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-4">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded"
              />
              <textarea
                placeholder="Shipping Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 w-full rounded h-24"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}