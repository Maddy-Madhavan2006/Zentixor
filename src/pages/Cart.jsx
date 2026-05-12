import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const syncCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const addItem = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
    syncCart(updatedCart);
  };

  const removeItem = (product) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === product.id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    syncCart(updatedCart);
  };

  const deleteFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    syncCart(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const shipping = 30.0;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 min-h-[60vh]">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Shopping Cart
          </h1>
          <div className="w-20 h-[2px] bg-black mx-auto mt-4 rounded-full" />
        </div>

        {cartItems.length === 0 ? (
          <div className="border border-gray-200 rounded-2xl p-16 text-center bg-gray-50">
            <h2 className="text-2xl font-semibold mb-6">
              Your Cart is Empty
            </h2>

            <Link
              to="/"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Back to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT: Items */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col md:flex-row gap-6 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition"
                >

                  {/* Delete */}
                  <button
                    onClick={() => deleteFromCart(item.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                    title="Remove item"
                  >
                    ✕
                  </button>

                  {/* Image */}
                  <div className="w-32 h-32 mx-auto md:mx-0 flex-shrink-0 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <h2 className="text-lg font-semibold line-clamp-1 text-gray-900">
                        {item.title}
                      </h2>

                      <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">

                      {/* Qty controls */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">

                        <button
                          onClick={() => removeItem(item)}
                          className="w-8 h-8 rounded-full bg-white border hover:bg-gray-50 flex items-center justify-center font-bold"
                        >
                          -
                        </button>

                        <span className="w-10 text-center font-semibold">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => addItem(item)}
                          className="w-8 h-8 rounded-full bg-white border hover:bg-gray-50 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-black">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* RIGHT: Summary */}
            <div className="h-fit lg:sticky lg:top-24 bg-gray-50 border border-gray-200 rounded-2xl p-8">

              <h2 className="text-2xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-black">
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                <hr className="my-4 border-gray-300" />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-black text-white py-4 rounded-full mt-8 font-semibold hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/"
                className="block text-center text-sm text-gray-500 mt-4 hover:underline"
              >
                Continue Shopping
              </Link>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Cart;