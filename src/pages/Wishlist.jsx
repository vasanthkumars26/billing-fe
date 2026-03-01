// import { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { HeartOff, ShoppingCart } from "lucide-react";

// export default function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);
//   const { addToCart } = useCart();

//   const [showPopup, setShowPopup] = useState(false);
//   const [popupText, setPopupText] = useState("");
//   const [burstId, setBurstId] = useState(null);

//   // LOAD wishlist
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(stored);
//   }, []);

//   // SAVE wishlist
//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const removeFromWishlist = (product) => {
//     setBurstId(product._id);

//     setTimeout(() => {
//       setWishlist((prev) => prev.filter((p) => p._id !== product._id));
//       setBurstId(null);
//     }, 300);

//     setPopupText(`${product.name} removed from wishlist`);
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 1200);
//   };

//   const moveToCart = (product) => {
//     addToCart(product);
//     setPopupText(`${product.name} added to cart`);
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 1200);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-3 sm:p-6">
//       {/* POPUP */}
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

//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left"
//       >
//         Your Wishlist
//       </motion.h1>

//       {wishlist.length === 0 ? (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-gray-500 text-center text-lg mt-20"
//         >
//           No items in your wishlist 💔
//         </motion.p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           <AnimatePresence>
//             {wishlist.map((item) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 whileHover={{ y: -5 }}
//                 transition={{ duration: 0.3 }}
//                 className="relative bg-white rounded-2xl shadow hover:shadow-xl p-3 flex flex-col overflow-hidden"
//               >
//                 {/* HEART BURST */}
//                 <AnimatePresence>
//                   {burstId === item._id && (
//                     <motion.div
//                       initial={{ scale: 0, opacity: 1 }}
//                       animate={{ scale: 2, opacity: 0 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="absolute inset-0 flex items-center justify-center pointer-events-none"
//                     >
//                       <HeartOff size={80} className="text-red-500" />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <motion.img
//                   src={item.image}
//                   alt={item.name}
//                   className="h-40 w-full object-contain rounded-lg"
//                   whileHover={{ scale: 1.05 }}
//                 />

//                 <h2 className="font-semibold mt-2 text-sm sm:text-base">
//                   {item.name}
//                 </h2>
//                 <p className="text-green-600 font-bold">₹{item.price}</p>

//                 <div className="mt-auto flex gap-2 pt-2">
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => moveToCart(item)}
//                     className="flex-1 bg-green-600 text-white py-1.5 rounded-lg text-sm hover:bg-green-700 transition flex items-center justify-center gap-1"
//                   >
//                     <ShoppingCart size={16} /> Add to Cart
//                   </motion.button>

//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => removeFromWishlist(item)}
//                     className="flex-1 bg-red-500 text-white py-1.5 rounded-lg text-sm hover:bg-red-600 transition flex items-center justify-center gap-1"
//                   >
//                     <HeartOff size={16} /> Remove
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// }