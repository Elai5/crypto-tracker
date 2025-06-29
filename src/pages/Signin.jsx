/** @format */

import React, { useState } from "react";
import {
  User,
  UserPlus,
  Mail,
  Zap,
  TrendingUp,
  Shield,
  Star,
  EyeOff,
  Eye,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp, loading } = useAuth();
  const isSignin = location.pathname === "/signin";
  const isSignUp = location.pathname === "/signup";

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("please enter both email and password");
      return;
    }
    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password);
      } else {
        await signIn(formData.email, formData.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden pt-20">
      {/* subtle background animation */}
      <div className="hidden md:flex absolute inset-0 overflow-hidden">
        <div className="hidden md:flex absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter-blur-xl opacity-10 animate-pulse"></div>
        <div className="hidden md:flex absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-mutiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-mutiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>
      </div>
      {/* Floating icons on display */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-70 left-40 text-blue-400 opacity-20 animate-bounce animation-delay-1000">
          <Zap size={24} />
        </div>
        <div className="absolute top-70 right-45 text-green-400 opacity-20 animate-bounce animation-delay-3000">
          <TrendingUp size={20} />
        </div>
        <div className="absolute bottom-50 left-40 text-indigo-400 opacity-20 animate-bounce animation-delay-2000">
          <Shield size={22} />
        </div>
        <div className="absolute bottom-50 right-40 text-purple-400 opacity-20 animate-bounce animate-delay-4000">
          <Star size={18} />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
              <Zap className="text-white" size={32} />
            </div>
            <h1 className="text-xl font-bold text-white">
              {isSignUp ? "Join KiproCurrency" : "Welcome Back"}
            </h1>
            <p className="text-gray-300">
              {isSignUp
                ? "Start your crpto journey today"
                : "Sign in to your account"}
            </p>
          </div>

          {/* form container */}
          <div className="backdrop-blur-sm bg-gray-800/80 border border-gray-700/50 rounded-2xl shadow-2xl p-8 space-y-6 ">
            {/* signup and signin toggle buttons */}

            <div className="flex gap-2 p-1 bg-gray-700/50 rounded-xl">
              <Link
                to="/signin"
                className={`flex-1 flex items-center justify-center gap-2 text-gray-400 hover:text-white font-medium rounded-lg text-xs md:text-sm px-4 py-3 transition-all duration-300 ${
                  isSignin
                    ? "text-white bg-blue-500 shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-600/50"
                }`}
              >
                <User size={18} />
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`flex-1 flex items-center justify-center gap-2 font-medium rounded-lg text-xs md:text-sm px-4 py-3 ${
                  isSignUp
                    ? "text-white bg-gradient-to-r from-blue-500 to-indigo shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-600/50"
                }`}
              >
                <UserPlus size={18} />
                SignUp
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* resst of form inputs */}
              <div className="space-y-5">
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    {" "}
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full text-sm md:text-base pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                      className="w-full text-sm md:text-base pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 mb-4">
                  <a href="#" className="text-sm text-blue-400 hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <div className="flex items-center px-3 space-x-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    id="rememberMe"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-300">
                    Remember Me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 text-sm md:text-base bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div
                        className="animate-spin inline-block w-5 h-5 border-[3px] border-white border-t-transparent rounded-full"
                        role="status"
                        aria-label="Loading"
                      />
                    </div>
                  ) : (
                    <>
                      {isSignUp ? <UserPlus size={20} /> : <User size={20} />}
                      {isSignUp ? "Sign Up" : "Sign In"}
                    </>
                  )}
                </button>

                {/* security badge for sense of security */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Shield size={16} />
                    <span className="font-medium"> Secure & Encrypted</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1">
                    {" "}
                    Your data is protected with bank-level encryption
                  </p>
                </div>

                <div className="text-center mt-6">
                  <p className="text-gray-400 text-sm">
                    {" "}
                    Don't have an account?
                    <button
                      type="button"
                      className="text-blue-400 px-1 hover:text-blue-300 font-medium transition-colors underline bg-transparent border-0 cursor-pointer"
                    >
                      {" "}
                      Create one here
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
