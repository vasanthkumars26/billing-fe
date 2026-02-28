import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { InvoiceProvider } from "./context/InvoiceContext";
import { EnquiryProvider } from "./context/EnquiryContext";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EnquiryProvider>
    <InvoiceProvider>
      <CartProvider>
        <AuthProvider>
      <App />
      </AuthProvider>
      <Toaster position="top-right" />
      </CartProvider>
    </InvoiceProvider></EnquiryProvider>
  </React.StrictMode>
);