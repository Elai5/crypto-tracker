/** @format */

import React from "react";
import SearchBar from "../components/Searchbar";
import { supabase } from "../supabaseClient";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = ({ searchTerm, onSearchChange, coins = [], onCoinSelect }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSingOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4 font-primary">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title Section */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Kipro Currency
            </h1>
            <p className="text-sm text-gray-400">
              Real-time cryptocurrency tracker
            </p>
          </div>
          <>
            {/* navigation links */}
            <nav>
              <ul className="flex  gap-5 ">
                <li className="text-white font-bold">
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Home
                  </NavLink>
                </li>
                {/* restricted to only is user is logged in */}
                {user && (
                  <li className="text-white font-bold">
                    <NavLink
                      to="/"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Market
                    </NavLink>
                  </li>
                )}
                {/* restricted to only is user is logged in */}
                {user && (
                  <li className="text-white font-bold">
                    <NavLink
                      to="/watchlist"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Watchlist
                    </NavLink>
                  </li>
                )}
                {/* Show Profile only if user is logged in */}
                {user && (
                  <li className=" text-white font-bold">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Profile
                    </NavLink>
                    {/* <ChevronDown size={16} /> */}
                  </li>
                )}

                {/* Show Join Now only if user is NOT logged in */}
                {!user && (
                  <li className="text-white font-bold">
                    <NavLink
                      to="/signin"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Join Now
                    </NavLink>
                  </li>
                )}

                {/* Show Sign Out button only if user is logged in */}
                {user && (
                  <li className="text-white font-bold">
                    <button
                      onClick={signOut}
                      className="hover:text-yellow-400 transition-colors"
                    >
                      Sign Out
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </>

          {/* Search Bar Section */}
          <div className="flex-1 max-w-md sm:ml-8">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              coins={coins}
              onCoinSelect={onCoinSelect}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
