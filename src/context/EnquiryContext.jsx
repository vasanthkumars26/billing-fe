import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState([]);

  const API = "http://localhost:5000/api/enquiries";

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setEnquiries(data);
  };

  const addEnquiry = async (enquiry) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });

    const data = await res.json();
    setEnquiries((prev) => [data, ...prev]);
    toast.success("Enquiry sent successfully!");
  };

  const deleteEnquiry = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setEnquiries(enquiries.filter((e) => e._id !== id));
    toast.success("Enquiry deleted");
  };

  return (
    <EnquiryContext.Provider
      value={{ enquiries, addEnquiry, deleteEnquiry }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => useContext(EnquiryContext);