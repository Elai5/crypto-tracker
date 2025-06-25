/** @format */

import React from "react";
import {
  User,
  UserPlus,
  Mail,
  CircleUserRound,
  RectangleEllipsis,
  SquareCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
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
      </div>
    </div>
  );
};

export default Signup;
