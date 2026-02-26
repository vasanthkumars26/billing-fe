import { useState } from "react";
import { useEnquiry } from "../context/EnquiryContext";

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
    <div className="max-w-5xl mx-auto p-6 space-y-10">

      {/* ABOUT SECTION */}
      <div className="bg-white shadow rounded-lg p-6">
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
      </div>

      {/* CONTACT FORM */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border p-2 w-full rounded"
            required
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message"
            rows="4"
            className="border p-2 w-full rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;