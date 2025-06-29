/** @format */

import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { Dot } from "lucide-react";

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
    <div className="bg-gray-900 p-6 pt-20 min-h-screen">
      <div className="md:px-20 pt-5">
        <h1 className="text-3xl font-bold mb-2 text-white">Profile</h1>
        <p className="mb-4 text-gray-500">
          View all your profile details here.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col items-center gap-3 p-4 rounded shadow-md sm:w-1/2 text-center border-1 border-gray-600">
            <div>
              <h2 className="font-semibold text-white text-xl md:text-3xl">
                {profile?.fullname || "Loading..."}
              </h2>
              <span className="text-green-400  text-sm md:text-base">
                {profile?.account_type || "User"}{" "}
              </span>
            </div>

            <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-[2px] md:border-[5px] border-gray-300">
              <img
                src={assets.cartoon}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4 rounded shadow-md w-full sm:w-1/2 border-1 border-gray-600">
            <div className="flex  justify-between mb-6">
              <h2 className="font-semibold text-white text-lg">
                Bio & other details
              </h2>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-900">
                <span className="block w-2 h-2 rounded-full bg-green-400"></span>
              </span>
            </div>
            <form action="" className="flex flex-col gap-1 md:gap-4 ">
              {/* Full Name and Email */}
              <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-8 w-full px-3 md:py-2">
                <div className="sm:w-1/2">
                  <h2 className="text-white text-lg font-primary">Full Name</h2>
                  <p className="text-gray-400 text-sm md:text-base font-secondary">
                    {profile?.fullname || "Loading ..."}
                  </p>
                </div>
                <div className="sm:w-1/2">
                  <h2 className="text-white font-primary text-lg">
                    Email Address
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base font-secondary">
                    {profile?.email || "Loading..."}
                  </p>
                </div>
              </div>

              {/* Account Type and Registration Date */}
              <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-8 w-full px-3 py-2 rounded">
                <div className="sm:w-1/2">
                  <h2 className="text-white font-primary text-lg">
                    Account Type
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base font-secondary">
                    {profile?.account_type || "Loading"}
                  </p>
                </div>
                <div className="sm:w-1/2">
                  <h2 className="text-white ">Registration Date</h2>
                  <p className="text-gray-400 text-sm md:text-base font-secondary">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString()
                      : "Loading"}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 md:w-1/2 w-full rounded text-white py-2 px-3 cursor-pointer">
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
