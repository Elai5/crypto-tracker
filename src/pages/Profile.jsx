/** @format */

import React from "react";
import { assets } from "../assets/assets";

export const Profile = () => {
  console.log("Profile page loaded");
  return (
    <div className="bg-gray-900 p-6 mt-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-white">Profile</h1>
      <p className="mb-4 text-gray-500">View all your profile details here.</p>
      <div className="flex">
        <div className="flex flex-col items-center  gap-3 p-4 rounded shadow-md w-1/2 text-center">
          <div>
            {" "}
            <h2 className="font-semibold text-white text-2xl">
              Maria Fernanda
            </h2>
            <span className="text-base text-green-400">Premium User</span>
          </div>

          <div className="w-48 h-48 rounded-full overflow-hidden border-[5px] border-gray-300">
            <img
              src={assets.cartoon}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 rounded shadow-md w-1/2 border-2">
          <div>
            {" "}
            <h2 className="font-semibold text-white text-2xl">
              Bio & Other Details
            </h2>
          </div>

          <div className="">
            <h2 className="text-gray-400">Full Name</h2>
            <p className=" text-white">Aboiud Kiprotich</p>
          </div>
          <div className="">
            <h2 className="text-gray-400">Email Address</h2>
            <p className=" text-white">Aboiud Kiprotich</p>
          </div>
            <div className="">
            <h2 className="text-gray-400">Account Type</h2>
            <p className=" text-white">Aboiud Kiprotich</p>
          </div>
        </div>
      </div>
    </div>
  );
};
