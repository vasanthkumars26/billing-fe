import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* HERO SECTION */}
      <section
        className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center text-white max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            InvoicePro
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Smart, fast & professional invoicing for modern businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Invoice Creation",
              desc: "Generate professional invoices instantly with tax & totals.",
            },
            {
              title: "Customer Management",
              desc: "Securely manage all your clients in one dashboard.",
            },
            {
              title: "Enquiry Handling",
              desc: "Receive & reply to customer enquiries efficiently.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {["Sign Up", "Create Invoice", "Manage & Track"].map((step, i) => (
            <div key={i} className="animate-slideUp">
              <div className="text-4xl font-bold text-indigo-600 mb-3">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step}</h3>
              <p className="text-gray-600">
                {step === "Sign Up" &&
                  "Create your free account in seconds."}
                {step === "Create Invoice" &&
                  "Add customer details and generate invoices."}
                {step === "Manage & Track" &&
                  "Track invoices and customer communication."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Ravi Kumar",
              role: "Business Owner",
              text: "InvoicePro simplified my billing process completely.",
            },
            {
              name: "Anita Sharma",
              role: "Freelancer",
              text: "Clean UI and very easy to use. Highly recommended!",
            },
            {
              name: "Arjun Patel",
              role: "Startup Founder",
              text: "Best invoicing tool I’ve used for my company.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-600 mb-4">“{t.text}”</p>
              <h4 className="font-semibold">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Invoicing Smarter Today
        </h2>
        <p className="mb-6 text-indigo-100">
          Join thousands of businesses using InvoicePro.
        </p>
        <Link
          to="/signup"
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Create Free Account
        </Link>
      </section>

      {/* FOOTER */}
      
    </div>
  );
};

export default Home;