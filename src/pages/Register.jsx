import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { div } from "framer-motion/client";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          tokenId: credentialResponse.credential,
          companyName: form.company || "Default Company",
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
    className="relative min-h-screen flex items-center justify-end overflow-hidden
    [background:radial-gradient(circle_at_bottom,_#BBAAE1_0%,_#8977B3_30%,_#2B2A41_50%,_#1F2134_75%,_#191B2A_100%)]"
  >
  <motion.div
  className="min-h-screen me-45 flex items-center justify-start
 p-8"
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Create Account
    </h2>

    <form onSubmit={handleRegister} className="space-y-4">
      {/* Name */}
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        />
      </div>

      {/* Company */}
      <div className="relative">
        <BuildingIcon
          className="absolute left-3 top-3 text-gray-400"
          size={20}
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full pl-10 pr-10 py-2 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none"
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 rounded-xl font-semibold hover:bg-amber-600 transition-all"
      >
        Register
      </button>
    </form>

    {/* Divider */}
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-300"></div>
      <span className="px-2 text-gray-500 text-sm">or</span>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>

    {/* Google Login */}
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => console.log("Google login failed")}
      shape="pill"
      width="100%"
    />

    {/* Login Redirect */}
    <p className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <Link to="/login" className="text-amber-600 hover:underline">
        Login
      </Link>
    </p>
  </div>
</motion.div>
</div>
</>

  );
}

function BuildingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    ></svg>
  );
}

export default Register;
