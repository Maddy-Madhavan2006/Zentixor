import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Email from "../components/custom/Email.jsx";
import User from "../components/custom/User.jsx";
import Pass from "../components/custom/Pass.jsx";
import CPass from "../components/custom/CPass.jsx";

import logo from "@/assets/logo.png";

function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!email || !username || !password || !confirmPass) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        toast.success("Account created successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {

        toast.error(data.message || "Registration failed");

      }

    } catch (error) {

      console.error(error);

      toast.error("Could not connect to server");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">

      <div className="hidden lg:flex relative overflow-hidden bg-black text-white">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-800" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">

          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Zentixor Logo"
              className="logo"
            />

            <h1 className="text-3xl font-bold text-white">
              Zentixor
            </h1>
          </div>

          <div className="max-w-md">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-5">
              Join The Future Of Shopping
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6 text-white">
              Create Your Premium Shopping Account
            </h2>

            <p className="text-zinc-400 leading-7 text-lg">
              Save your favorite products,
              track orders, and enjoy a
              seamless modern shopping
              experience built for you.
            </p>
          </div>

          <p className="text-sm text-zinc-500">
            © 2026 Zentixor. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <img
              src={logo}
              alt="Zentixor Logo"
              className="w-14 h-14 object-contain"
            />

            <h1 className="text-2xl font-bold text-black">
              Zentixor
            </h1>
          </div>

          <div className="mb-8">
            <p className="text-sm text-zinc-500 mb-2">
              Welcome 👋
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-black">
              Create Account
            </h2>

            <p className="text-zinc-500 mt-3 leading-7">
              Register to start shopping
              premium products with ease.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <User
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <Email
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <Pass
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <CPass
              value={confirmPass}
              onChange={(e) =>
                setConfirmPass(e.target.value)
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-black hover:bg-zinc-800 text-white text-sm font-semibold transition-all duration-300 mt-2 hover:cursor-pointer disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
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

            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-black hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;