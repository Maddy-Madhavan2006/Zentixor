import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const shipping = 30;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Checkout
          </h1>
          <div className="w-20 h-[2px] bg-black mx-auto mt-4 rounded-full" />
        </div>

        {cartItems.length === 0 ? (
          <div className="border border-gray-200 rounded-2xl p-16 text-center bg-gray-50">
            <h2 className="text-2xl font-semibold mb-6">
              No Items in Cart
            </h2>

            <Link
              to="/products"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT: FORM */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10">

              <h2 className="text-2xl font-bold mb-8">
                Billing Details
              </h2>

              <form className="space-y-6 text-sm">

                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Country
                    </label>
                    <select className="w-full border border-gray-300 rounded-xl px-4 py-3">
                      <option>India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      State
                    </label>
                    <select className="w-full border border-gray-300 rounded-xl px-4 py-3">
                      <option>Tamil Nadu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      placeholder="620001"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="pt-6">
                  <h2 className="text-xl font-bold mb-6">
                    Payment Details
                  </h2>

                  <div className="space-y-6">

                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                      />

                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                      />
                    </div>

                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition mt-6"
                >
                  Pay Now
                </button>

              </form>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="lg:sticky lg:top-24 h-fit bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between text-gray-600">
                  <span>Products ({totalItems})</span>
                  <span className="text-black font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-black font-semibold">
                    ${shipping}
                  </span>
                </div>

                <hr className="my-4 border-gray-300" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Items preview */}
              <div className="mt-8 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain border border-gray-200 rounded-lg p-2 bg-white"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Qty: {item.qty}
                      </p>
                    </div>

                    <span className="font-semibold text-sm">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>

                  </div>
                ))}
              </div>

              <Link
                to="/"
                className="block text-center text-sm text-gray-500 mt-6 hover:underline"
              >
                Back to Shopping
              </Link>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Checkout;