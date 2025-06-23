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

const Signup = () => {
  return (
    <div>
      <div className="flex h-screen">
        <div className="flex justify-center py-4 bg-white w-full ">
          <form
            action=""
            method="post"
            className=" w-1/2 flex flex-col items-center gap-5 py-6  px-8 bg-red-400 shadow-lg  border rounded-lg"
          >
            <div className="flex gap-4">
              <button
                type="button"
                className=" flex gap-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {" "}
                <User />
                Sign In
              </button>
              <button
                type="button"
                className="flex gap-4 py-2.5 px-5 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {" "}
                <UserPlus />
                Sign Up
              </button>
            </div>
            <div className="w-full flex flex-col gap-8">
              <label
                htmlFor=""
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full"
              >
                {" "}
                <Mail />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </label>
              <label
                htmlFor=""
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full"
              >
                {" "}
                <CircleUserRound />
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required
                />
              </label>
              <label
                htmlFor=""
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full"
              >
                {" "}
                <RectangleEllipsis />
                <input
                  type="password"
                  name="pass1"
                  id="pass1"
                  placeholder="password"
                  required
                />
              </label>
              <label
                htmlFor=""
                className="flex gap-3 py-2 px-2 shadow-md rounded-lg w-full"
              >
                {" "}
                <SquareCheck />
                <input
                  type="password"
                  name="pass2"
                  id="pass2"
                  placeholder="Confirm Password"
                  required
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
                  for="link-checkbox"
                  className="ms-2 text-sm font-md dark:text-gray-300"
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
                className="flex gap-4  py-2.5 px-5 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
              >
                {" "}
                <UserPlus />
                <span className="text-center"> Sign Up</span>
              </button>
            </div>
          </form>
        </div>

        {/* <p className="text-white text-2xl">Signup Page</p> */}
      </div>
    </div>
  );
};

export default Signup;
