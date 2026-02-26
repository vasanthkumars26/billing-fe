import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { InvoiceProvider } from "./context/InvoiceContext";
import { EnquiryProvider } from "./context/EnquiryContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EnquiryProvider>
    <InvoiceProvider>
      <App />
      <Toaster position="top-right" />
    </InvoiceProvider></EnquiryProvider>
  </React.StrictMode>
);