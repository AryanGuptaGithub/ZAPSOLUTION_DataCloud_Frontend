// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { User, Lock, LogIn, Globe, UserPlus, KeyRound, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: hook up backend
    alert(`Logging in as: ${form.email}`);
    navigate("/dashboard");
  };

  const handleGoogleLogin = (credentialResponse) => {
    // TODO: hook up backend
    console.log("Google login success:", credentialResponse);
    navigate("/dashboard");
  };

  return (
<>
  <div
    className="relative min-h-screen flex items-center justify-between overflow-hidden
    [background:radial-gradient(circle_at_bottom,_#BBAAE1_0%,_#8977B3_30%,_#2B2A41_50%,_#1F2134_75%,_#191B2A_100%)]"
  >
    {/* Left Side - Form */}
    <motion.div
      className="flex-1 flex items-center justify-center p-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-amber-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-[#2B2A41]/60 text-white 
              placeholder-gray-300 border border-gray-500/40 focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-amber-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-2 rounded-xl bg-[#2B2A41]/60 text-white 
              placeholder-gray-300 border border-gray-500/40 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-300 hover:text-amber-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-xl font-semibold hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-500/40"></div>
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-500/40"></div>
        </div>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google login failed")}
          shape="pill"
          width="100%"
        />

        {/* Extra Links */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-gray-300">
          <Link
            to="/forgotpassword"
            className="flex items-center gap-1 text-amber-400 hover:underline"
          >
            <KeyRound size={16} /> Forgot Password
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1 text-amber-400 hover:underline"
          >
            <UserPlus size={16} /> Register
          </Link>
        </div>
      </div>
    </motion.div>

    {/* Right Side - Image */}
    <div className="hidden md:flex flex-1 items-center justify-center p-8">
      <img
        src="/hero.png"
        alt="Login Illustration"
        className="max-w-lg w-full object-contain drop-shadow-2xl"
      />
    </div>
  </div>
</>

  );
}

export default LoginPage;
