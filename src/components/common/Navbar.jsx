import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useEnquiry } from "../../context/EnquiryContext";
import { useCart } from "../../context/CartContext";

const ADMIN_UID = "ntPZ8y7lIkWhnQCMaY0rpK4LB8x2";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { enquiries } = useEnquiry();
  const { cart } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const isAdmin = user?.uid === ADMIN_UID;

  const linkClass = (path) =>
    `px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleLogin = () => navigate("/login");

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
      <h1 className="text-xl font-bold text-blue-600">Invoice App</h1>

      {/* Desktop */}
      <div className="hidden md:flex gap-3 items-center">
        {/* <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link> */}
        <Link className={linkClass("/products")} to="/products">Products</Link>

        {/* <Link className={`${linkClass("/wishlist")} relative`} to="/wishlist">
          Wishlist
        </Link> */}
        <Link className={`${linkClass("/cart")} relative`} to="/cart">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {/* <Link className={linkClass("/create-invoice")} to="/create-invoice">Create Invoice</Link>
        <Link className={linkClass("/invoices")} to="/invoices">Invoices</Link>

        <Link className={`${linkClass("/enquiries")} relative`} to="/enquiries">
          Enquiries
          {enquiries.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
              {enquiries.length}
            </span>
          )}
        </Link> */}

        <Link className={linkClass("/profile")} to="/profile">Profile</Link>

        {isAdmin && (
          <Link className={linkClass("/admin")} to="/admin">
            Admin Dashboard
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="ml-3 bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="ml-3 bg-green-600 text-white px-3 py-1 rounded">
            Login
          </button>
        )}
      </div>

      {/* Mobile Button */}
      <button className="md:hidden text-xl" onClick={() => setOpen(!open)}>☰</button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white z-10 shadow-md flex flex-col p-4 md:hidden space-y-2">
          {/* <Link onClick={() => setOpen(false)} className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link> */}
          <Link onClick={() => setOpen(false)} className={linkClass("/products")} to="/products">Products</Link>
          {/* <Link onClick={() => setOpen(false)} className={linkClass("/wishlist")} to="/wishlist">Wishlist</Link> */}
          <Link onClick={() => setOpen(false)} className={linkClass("/cart")} to="/cart">Cart</Link>
          <Link onClick={() => setOpen(false)} className={linkClass("/profile")} to="/profile">Profile</Link>

          {isAdmin && (
            <Link onClick={() => setOpen(false)} className={linkClass("/admin")} to="/admin">
              Admin Dashboard
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="mt-3 bg-red-500 text-white px-3 py-2 rounded">
              Logout
            </button>
          ) : (
            <button onClick={handleLogin} className="mt-3 bg-green-600 text-white px-3 py-2 rounded">
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;