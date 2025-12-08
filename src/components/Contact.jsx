import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addToast("Your message has been sent!", "success");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="page-section">
      <div className="page-container">

        {/* PAGE HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">Contact & Support</h2>
          <p className="text-lg text-gray-600 mt-3">
            Reach out to us—partnerships, feedback, or support queries.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white p-10 rounded-2xl shadow-lg max-w-xl mx-auto">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="text-gray-700 font-semibold">Your Name</label>
              <input
                type="text"
                required
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-gray-700 font-semibold">Email Address</label>
              <input
                type="email"
                required
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-gray-700 font-semibold">Message</label>
              <textarea
                required
                rows="5"
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
