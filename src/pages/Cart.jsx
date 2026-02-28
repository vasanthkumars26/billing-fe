import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-center md:text-left"
      >
        🛒 Your Cart
      </motion.h1>

      {cart.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center text-lg"
        >
          Cart is empty
        </motion.p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* ITEMS */}
          <div className="md:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row justify-between items-center gap-4 border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg">{item.name}</h2>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.input
                      whileTap={{ scale: 0.95 }}
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item._id, Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-center"
                    />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg shadow"
                    >
                      Remove
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="border rounded-xl p-5 shadow-lg h-fit bg-white sticky top-24"
          >
            <h2 className="text-xl font-bold mb-3">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4 font-semibold text-lg">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-2 rounded-lg mb-3"
            >
              Checkout
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="w-full bg-gray-300 text-black py-2 rounded-lg"
            >
              Clear Cart
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}