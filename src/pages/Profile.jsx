/** @format */

import React from "react";

export const Profile = () => {
  console.log("Profile page loaded");
  return (
    <div className="p-6 mt-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Profile</h1>
      <p className="mb-4">View all your profile details here.</p>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Maria Fernanda</h2>
        <span className="text-sm text-gray-500">Premium User</span>
      </div>
    </div>
  );
};
