/** @format */

import React, { useState } from "react";
import {
  User,
  UserPlus,
  Mail,
  CircleUserRound,
  RectangleEllipsis,
  SquareCheck,
  Zap,
  TrendingUp,
  Shield,
  Star,
  EyeOff,
  Eye,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* subtle background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter-blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-mutiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-mutiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>
      </div>
      {/* crypto coins for display */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-blue-400 opacity-20 animate-bounce animation-delay-1000">
          <Zap size={24} />
        </div>
        <div className="absolute top-40 right-32 text-green-400 opacity-20 animate-bounce animation-delay-3000">
          <TrendingUp size={20} />
        </div>
        <div className="absolute bottom-32 left-40 text-indigo-400 opacity-20 animate-bounce animation-delay-2000">
          <Shield size={22} />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-400 opacity-20 animate-bounce animate-delay-4000">
          <Star size={18} />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
              <Zap className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {" "}
              Join KiproCurrency
            </h1>
            <p className="text-gray-300">Start your crypto journey today</p>
          </div>

          {/* form container */}
          <div className="backdrop-blur-sm bg-gray-800/80 border border-gray-700/50 rounded-2xl shadow-2xl p-8 space-y-6 ">
            {/* signup and signin buttons */}
            <div className="flex gap-2 p-1 bg-gray-700/50 rounded-xl">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 text-gray-400 hover:text-white font-medium rounded-lg text-sm px-4 py-3 transition-all duration-300 hover:bg-gray-600/50"
              >
                <User size={18} />
                Sign In
              </button>
              <div className="flex-1 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 font-medium rounded-lg text-sm px-4 py-3 shadow-lg">
                <UserPlus size={18} />
                Sign Up
              </div>
            </div>

            <div className="space-y-5">
              <div className="group">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  {" "}
                  EmailAddress
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id=""
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CircleUserRound className="h-5 w-5 text-gray-500 group-focus--within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    id=""
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Please enter your username"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
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
                    type="password"
                    name="password"
                    id=""
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    required
                    className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
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

              <div className="group">
                <label
                  htmlFor="Confirm Password"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Conffirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id=""
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Please Confrirm your password"
                    required
                    className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover-text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    id=""
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>

                <label
                  htmlFor="terms&conditions"
                  className="text-sm text-gray-300"
                >
                  Accept{" "}
                  <a
                    href=""
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    {" "}
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4  focus:ring-blue-500/50"
              >
                <UserPlus size={20} />
                Create Account
              </button>

              {/* security badge for sense of security */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Shield size={16} />
                  <span className="font-medium"> Secure & Encrypted</span>
                </div>
                <p className="text-gray-300 txt-xs mt-1">
                  {" "}
                  Your data is protected with bank-level encryption
                </p>
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  {" "}
                  Already have an account?
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 font-medium transitions-colors underline bg-transparent border-none cursor-pointer"
                  >
                    {" "}
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex h-screen">
        <div className="flex justify-center py-4 bg-gray-800 w-full ">
          <form
            action=""
            method="post"
            className="w-1/2 flex flex-col items-center bg-white gap-5 py-10 px-8 shadow-lg border rounded-lg"
          >
            <div className="flex gap-2">
              <Link
                to="/signin"
                className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
              >
                <User />
                Sign In
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
              >
                <UserPlus />
                Sign Up
              </Link>
            </div>
            <div className="w-full flex flex-col gap-8">
              <label
                htmlFor="email"
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full focus-within:ring-2 focus-within:ring-blue-500"
              >
                {" "}
                <Mail />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  className="w-full outline-none "
                />
              </label>
              <label
                htmlFor="username"
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full focus-within:ring-2 focus-within:ring-blue-500"
              >
                {" "}
                <CircleUserRound />
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required
                  className="w-full outline-none"
                />
              </label>
              <label
                htmlFor="password"
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full focus-within:ring-2 focus-within:ring-blue-500"
              >
                {" "}
                <RectangleEllipsis />
                <input
                  type="password"
                  name="pass1"
                  id="pass1"
                  placeholder="password"
                  required
                  className="w-full outline-none"
                />
              </label>
              <label
                htmlFor="confirm-password"
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full focus-within:ring-2 focus-within:ring-blue-500"
              >
                {" "}
                <SquareCheck />
                <input
                  type="password"
                  name="pass2"
                  id="pass2"
                  placeholder="Confirm Password"
                  required
                  className="w-full outline-none"
                />
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name=""
                  id="link-checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ms-2 text-sm font-md dark:text-gray-900"
                >
                  Accept{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                type="button"
                className="flex items-center justify-center gap-2  py-2.5 px-5 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center cursor-pointer transition-colors duration-300"
              >
                {" "}
                <UserPlus />
                <span className="text-sm"> Sign Up</span>
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default Signup;
