/** @format */

import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export const Profile = () => {
  console.log("Profile page loaded");
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    console.log("Fetching profile for user.id:", user?.id);

    if (loading) return;
    if (!user || !user.id) {
      console.warn("No user id available");
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      setFetching(true);
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      console.log("Fetch profile result data:", data);
      console.log("Fetch profile result error:", error);

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }
      setFetching(false);
    };

    fetchProfile();
  }, [loading, user]);

  if (loading) {
    return (
      <div className="text-red-400 mt-70 text-center">
        Authenticating user...
      </div>
    );
  }
  if (fetching) {
    return (
      <div className="text-green-500 mt-70 text-center">Loading profile...</div>
    );
  }

  if (!profile) {
    return (
      <div className="text-blue-700 mt-100 text-center">
        No profile found for this user.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 mt-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-white">Profile</h1>
      <p className="mb-4 text-gray-500">View all your profile details here.</p>
      <div className="flex">
        <div className="flex flex-col items-center gap-3 p-4 rounded shadow-md w-1/2 text-center">
          <div>
            <h2 className="font-semibold text-white text-2xl">
              {profile?.fullname || "Loading..."}
            </h2>
            <span className="text-base text-green-400">
              {profile?.account_type || "User"}{" "}
            </span>
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
            <h2 className="font-semibold text-white text-2xl">
              Bio & Other Details
            </h2>
          </div>

          <div>
            <h2 className="text-gray-400">Full Name</h2>
            <p className="text-white">{profile?.fullname || "Loading ..."}</p>
          </div>
          <div>
            <h2 className="text-gray-400">Email Address</h2>
            <p className="text-white">{profile?.email || "Loading..."}</p>
          </div>
          <div>
            <h2 className="text-gray-400">Account Type</h2>
            <p className="text-white">
              {profile?.account_type || "Loading"}
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
