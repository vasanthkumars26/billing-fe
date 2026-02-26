import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const shapes = ["dots", "square", "triangle", "bars"];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/create-invoice");
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % shapes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlelogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => navigate("/create-invoice"))
      .catch(() => setErr("Invalid email or password"));
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/create-invoice");
    } catch {
      setErr("Google login failed");
    }
  };

  const renderShape = () => {
    const shape = shapes[shapeIndex];

    if (shape === "dots") {
      return (
        <div className="flex space-x-3 mb-6">
          <span className="w-4 h-4 bg-white rounded-full animate-bounce"></span>
          <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></span>
          <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></span>
        </div>
      );
    }

    if (shape === "square") {
      return <div className="w-16 h-16 bg-white animate-spin mb-6"></div>;
    }

    if (shape === "triangle") {
      return (
        <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-transparent border-b-white animate-pulse mb-6"></div>
      );
    }

    if (shape === "bars") {
      return (
        <div className="flex space-x-2 mb-6">
          <span className="w-3 h-10 bg-white animate-pulse"></span>
          <span className="w-3 h-14 bg-white animate-pulse delay-150"></span>
          <span className="w-3 h-8 bg-white animate-pulse delay-300"></span>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div
          className="hidden md:flex text-white p-10 flex-col justify-center items-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=80')",
          }}
        >
          {renderShape()}
          <h2 className="text-3xl font-bold">InvoicePro</h2>
          <p className="text-center mt-3 opacity-90">
            Secure access to your dashboard
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-500 mb-6">
            Access your invoice dashboard
          </p>

          <form onSubmit={handlelogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />

            {err && <p className="text-red-500 text-sm">{err}</p>}

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="w-5"
                alt="google"
              />
              Login with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?
              <Link to="/signup" className="text-indigo-600 ml-1 font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;