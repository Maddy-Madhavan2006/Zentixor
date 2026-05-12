import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ShoppingBag,
  Home,
  Info,
  Phone,
  Package,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);

  // Get user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Show username or Guest
  const user = storedUser?.username || "Guest";

  // Check login
  const isLoggedIn =
    localStorage.getItem("token") === "true";

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const totalItems = cart.reduce(
        (total, item) => total + item.qty,
        0
      );

      setCartCount(totalItems);
    };

    updateCartCount();

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <Menu size={22} />
            </button>

            {/* LOGO */}
            <NavLink
              to="/"
              className="text-xl sm:text-2xl font-bold tracking-tight"
            >
              Zentixor
            </NavLink>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* USER */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
              <User size={16} />

              <span className="text-sm font-medium">
                {user}
              </span>
            </div>

            {/* CART */}
            <NavLink
              to="/cart"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              <ShoppingBag size={17} />

              <span className="text-sm font-medium">
                {cartCount}
              </span>
            </NavLink>
          </div>
        </nav>
      </header>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          open ? "visible" : "invisible"
        }`}
      >

        {/* OVERLAY */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR PANEL */}
        <aside
          className={`absolute left-0 top-0 h-screen w-80 bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >

          {/* HEADER */}
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center justify-between p-5">

              <div>
                <p className="text-sm text-gray-500">
                  Welcome
                </p>

                <h2 className="text-xl font-bold">
                  {user}
                </h2>
              </div>

              {/* CLOSE */}
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="p-5">

            <div className="flex flex-col gap-2">

              <NavLink
                to="/"
                className={navLinkStyles}
                onClick={() => setOpen(false)}
              >
                <Home size={18} />
                Home
              </NavLink>

              <NavLink
                to="/productlist"
                className={navLinkStyles}
                onClick={() => setOpen(false)}
              >
                <Package size={18} />
                Products
              </NavLink>

              <NavLink
                to="/about"
                className={navLinkStyles}
                onClick={() => setOpen(false)}
              >
                <Info size={18} />
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={navLinkStyles}
                onClick={() => setOpen(false)}
              >
                <Phone size={18} />
                Contact
              </NavLink>
            </div>

            {/* DIVIDER */}
            <div className="my-8 border-t" />

            {/* AUTH */}
            <div className="flex flex-col gap-3">

              {!isLoggedIn && (
                <>
                  {/* LOGIN */}
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition"
                  >
                    <LogIn size={18} />
                    Login
                  </NavLink>

                  {/* REGISTER */}
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    <UserPlus size={18} />
                    Register
                  </NavLink>
                </>
              )}

              {/* LOGOUT */}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </div>

            {/* EXTRA SPACE */}
            <div className="h-20" />

          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;