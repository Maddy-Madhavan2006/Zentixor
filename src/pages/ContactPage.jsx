import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

const ContactPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        toast.success(data.message);

        // CLEAR FORM
        setName("");
        setEmail("");
        setMessage("");

      } else {

        toast.error(data.message || "Failed to send message");

      }

    } catch (error) {

      console.error(error);

      toast.error("Server error. Try again later.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-14">

        {/* Heading */}
        <div className="text-center mb-14">

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Contact Us
          </h1>

          <div className="w-20 h-[2px] bg-black mx-auto mt-4 rounded-full" />

          <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-xl mx-auto">
            Have questions or need help? We’re here to assist you anytime.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* Message */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-50 hover:cursor-pointer"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;