import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "https://billing-be-gysy.onrender.com";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const getImageUrl = (img) => {
    if (!img) return "";
    return img.startsWith("http") ? img : `${BASE_URL}/${img}`;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopupText(`${product.name} added to cart`);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="relative">
      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50"
          >
            {popupText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {products.map(p => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="border rounded shadow p-3 bg-white flex flex-col"
            >
              <motion.img
                src={getImageUrl(p.image)}
                className="h-40 w-full object-contain rounded"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              <h3 className="font-semibold mt-2">{p.name}</h3>
              <p>₹{p.price}</p>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAddToCart(p)}
                className="bg-green-600 text-white px-3 py-1 rounded mt-auto hover:bg-green-700 transition"
              >
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}