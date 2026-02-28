import { useState } from "react";
import { useEnquiry } from "../context/EnquiryContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { addEnquiry } = useEnquiry();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addEnquiry({
      ...form,
      date: new Date().toLocaleString(),
    });

    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto p-6 space-y-10"
    >
      {/* ABOUT SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-3">About Us</h1>

        <h2 className="text-lg font-semibold text-blue-600 mb-2">
          A2V Solutions
        </h2>

        <p className="text-gray-700 mb-3 leading-relaxed">
          A2V is a professional services company focused on delivering
          high-quality digital and business solutions.
        </p>

        <div className="mt-4 space-y-1 text-gray-800">
          <p><strong>Email:</strong> support@a2v.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>
      </motion.div>

      {/* CONTACT FORM */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border p-2 w-full rounded"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border p-2 w-full rounded"
            required
          />

          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message"
            rows="4"
            className="border p-2 w-full rounded"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Profile;