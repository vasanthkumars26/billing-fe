import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useEnquiry } from "../../context/EnquiryContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { enquiries } = useEnquiry();
  const [user, setUser] = useState(null); // 🔥 track auth

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

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

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
      <h1 className="text-xl font-bold text-blue-600">Invoice App</h1>

      {/* Desktop */}
      <div className="hidden md:flex gap-3 items-center">
        <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
        <Link className={linkClass("/create-invoice")} to="/create-invoice">Create Invoice</Link>
        <Link className={linkClass("/invoices")} to="/invoices">Invoices</Link>

        <Link className={`${linkClass("/enquiries")} relative`} to="/enquiries">
          Enquiries
          {enquiries.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
              {enquiries.length}
            </span>
          )}
        </Link>

        <Link className={linkClass("/profile")} to="/profile">Profile</Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="ml-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="ml-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-700 text-xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col p-4 md:hidden z-50 space-y-2">
          <Link onClick={() => setOpen(false)} className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
          <Link onClick={() => setOpen(false)} className={linkClass("/create-invoice")} to="/create-invoice">Create Invoice</Link>
          <Link onClick={() => setOpen(false)} className={linkClass("/invoices")} to="/invoices">Invoices</Link>

          <Link onClick={() => setOpen(false)} className={linkClass("/enquiries")} to="/enquiries">
            Enquiries {enquiries.length > 0 && `(${enquiries.length})`}
          </Link>

          <Link onClick={() => setOpen(false)} className={linkClass("/profile")} to="/profile">Profile</Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="mt-3 bg-red-500 text-white px-3 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="mt-3 bg-green-600 text-white px-3 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;