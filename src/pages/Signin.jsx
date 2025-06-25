/** @format */

import React from "react";
import { User, UserPlus, Mail, RectangleEllipsis } from "lucide-react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div>
      {" "}
      <div className="flex h-screen">
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
              <span className="px-2 text-blue-700">Forgot Password?</span>
              <label for="input checkbox" className="px-2 flex items-center ">
                <input type="checkbox" name="" id="" className="mr-2 size-5" />
                <span className="text-md">Remember Me</span>
              </label>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-5 me-2 mb-2 text-base font-medium text-white bg-blue-700 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center cursor-pointer transition-colors duration-300"
              >
                {" "}
                <User />
                <span className="text-sm"> Sign In</span>
              </button>

              <Link
                to="/signup"
                className="flex items-center justify-center bg-gray-100/60 backdrop-blur-sm rounded-lg border border-gray-200 shadow py-2.5 px-5 w-full mx-auto"
              >
                Don't have an account?{" "}
                <span className="px-2 text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
