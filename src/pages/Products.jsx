// import { useEffect, useState } from "react";
// import { getProducts } from "../services/productService";
// import { useCart } from "../context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "https://billing-be-gysy.onrender.com";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const [showPopup, setShowPopup] = useState(false);
//   const [popupText, setPopupText] = useState("");
//   const [wishlist, setWishlist] = useState([]);

//   // LOAD wishlist from localStorage
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(stored);
//   }, []);

//   // SAVE wishlist to localStorage (real-time)
//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   useEffect(() => {
//     getProducts().then(res => setProducts(res.data));
//   }, []);

//   const getImageUrl = (img) => {
//     if (!img) return "";
//     return img.startsWith("http") ? img : `${BASE_URL}/${img}`;
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     setPopupText(`${product.name} added to cart`);
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 2000);
//   };

//   const handleBuyNow = (product) => {
//     addToCart(product);
//     setPopupText(`Proceeding to checkout with ${product.name}`);
//     setShowPopup(true);

//     setTimeout(() => {
//       setShowPopup(false);
//       navigate("/checkout");
//     }, 1500);
//   };

//   // WISHLIST TOGGLE (REAL TIME)
//   const toggleWishlist = (product) => {
//     setWishlist((prev) => {
//       const exists = prev.find((p) => p._id === product._id);

//       if (exists) {
//         setPopupText(`${product.name} removed from wishlist`);
//         return prev.filter((p) => p._id !== product._id);
//       } else {
//         setPopupText(`${product.name} added to wishlist`);
//         return [...prev, product];
//       }
//     });

//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 1500);
//   };

//   return (
//     <div className="relative p-2 sm:p-4">
//       {/* Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0, y: -20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-xl shadow-lg z-50"
//           >
//             {popupText}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         <AnimatePresence>
//           {products.map(p => (
//             <motion.div
//               key={p._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.3 }}
//               className="relative bg-white rounded-2xl shadow hover:shadow-xl p-3 flex flex-col"
//             >
//               {/* Wishlist */}
//               <button
//                 onClick={() => toggleWishlist(p)}
//                 className="absolute top-2 right-3 bg-white rounded-full p-1 shadow"
//               >
//                 <Heart
//                   size={20}
//                   className={
//                     wishlist.find((w) => w._id === p._id)
//                       ? "fill-red-500 text-red-500"
//                       : "text-gray-400"
//                   }
//                 />
//               </button>

//               {/* Image */}
//               <motion.img
//                 src={getImageUrl(p.image)}
//                 alt={p.name}
//                 className="h-44 w-full object-contain rounded-lg"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               />

//               {/* Info */}
//               <h3 className="font-semibold mt-2 text-sm sm:text-base">
//                 {p.name}
//               </h3>
//               <p className="text-green-600 font-bold">₹{p.price}</p>

//               {/* Buttons */}
//               <div className="mt-auto flex gap-2">
//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handleAddToCart(p)}
//                   className="flex-1 bg-green-300 text-white py-1.5 rounded-lg text-sm hover:bg-green-700 transition"
//                 >
//                   Add to Cart
//                 </motion.button>

//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => handleBuyNow(p)}
//                   className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
//                 >
//                   Buy Now
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://billing-be-gysy.onrender.com";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [wishlist, setWishlist] = useState([]);

  // LOAD wishlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  // SAVE wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // LOAD products
  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const getImageUrl = (img) => {
    if (!img) return "";
    return img.startsWith("http") ? img : `${BASE_URL}/${img}`;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopupText(`${product.name} added to cart`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    setPopupText(`Proceeding to checkout with ${product.name}`);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      navigate("/checkout");
    }, 1200);
  };

  // WISHLIST TOGGLE
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) {
        setPopupText(`${product.name} removed from wishlist`);
        return prev.filter((p) => p._id !== product._id);
      } else {
        setPopupText(`${product.name} added to wishlist`);
        return [...prev, product];
      }
    });

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1200);
  };

  return (
    <div className="relative p-2 sm:p-4">
      {/* POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-xl shadow-lg z-50"
          >
            {popupText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((p) => {
            const isWishlisted = wishlist.some((w) => w._id === p._id);

            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl shadow hover:shadow-xl p-3 flex flex-col"
              >
                {/* WISHLIST ICON */}
                <button
                  onClick={() => toggleWishlist(p)}
                  className="absolute top-2 right-3 bg-white rounded-full p-1 shadow"
                >
                  <Heart
                    size={20}
                    className={
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>

                {/* IMAGE */}
                <motion.img
                  src={getImageUrl(p.image)}
                  alt={p.name}
                  className="h-44 w-full object-contain rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* INFO */}
                <h3 className="font-semibold mt-2 text-sm sm:text-base">
                  {p.name}
                </h3>
                <p className="text-green-600 font-bold">₹{p.price}</p>

                {/* ACTION BUTTONS */}
                <div className="mt-auto flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(p)}
                    className="flex-1 bg-slate-500 text-white py-1.5 rounded-lg text-sm hover:bg-slate-700 transition"
                  >
                    Add to Cart
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleBuyNow(p)}
                    className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}