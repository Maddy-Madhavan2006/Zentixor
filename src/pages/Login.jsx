import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Email from "../components/custom/Email.jsx";
import Pass from "../components/custom/Pass.jsx";

import logo from "@/assets/logo.png";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "https://zentixor.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("token", "true");

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        toast.success(
          `Welcome back, ${data.user?.username || "User"}`
        );

        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else {

        toast.error(
          data.message || "Invalid email or password"
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Could not connect to the server"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex relative overflow-hidden bg-black text-white">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-800" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">

          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="Zentixor Logo"
                className="logo"
              />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Zentixor
            </h1>
          </div>

          <div className="max-w-md">

            <p className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-5">
              Premium Shopping Experience
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6 text-white">
              Discover Modern Fashion & Lifestyle
            </h2>

            <p className="text-zinc-400 leading-7">
              Shop curated collections with premium quality
              products crafted for style, comfort, and
              everyday elegance.
            </p>
          </div>

          <p className="text-sm text-zinc-500">
            © 2026 Zentixor. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">

            <img
              src={logo}
              alt="Zentixor Logo"
              className="w-12 h-12 object-contain"
            />

            <h1 className="text-2xl font-bold text-black">
              Zentixor
            </h1>
          </div>

          <div className="mb-8">

            <p className="text-sm text-zinc-500 mb-2">
              Welcome back 👋
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-black">
              Sign in
            </h2>

            <p className="text-zinc-500 mt-3">
              Login to continue shopping your favorite
              products.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>
              <Email
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div>
              <Pass
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-black hover:bg-zinc-800 text-white text-sm font-semibold transition-all duration-300 hover:cursor-pointer disabled:opacity-50"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          <div className="relative my-8">

            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-zinc-400">
                OR
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500">

            Don’t have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-black hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;