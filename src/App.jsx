import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import Product from "@/pages/Product";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Checkout from "@/pages/Checkout";
import PageNotFound from "@/pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>

      {/* TOAST */}
      <Toaster position="top-center" />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Products */}
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />

        {/* Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;