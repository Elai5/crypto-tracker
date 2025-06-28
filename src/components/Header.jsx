/** @format */

import React from "react";
import SearchBar from "../components/Searchbar";
// import { supabase } from "../supabaseClient";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = ({ searchTerm, onSearchChange, coins = [], onCoinSelect }) => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4 font-primary">
        <div className="flex flex-col justify-around sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Title Section */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold text-white">Kipro Currency</h1>
            <p className="text-sm text-gray-400">
              Real-time cryptocurrency tracker
            </p>
          </div>

          {/* navigation links */}
          <nav>
            <ul className="flex gap-5">
              {/* Home - Always visible */}
              <li className="text-white font-bold">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400"
                      : "hover:text-blue-400 transition-colors"
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* Conditional links based on auth state */}
              {!loading && (
                <>
                  {/* Show these links only when user is logged in */}
                  {user && (
                    <>
                      <li className="text-white font-bold">
                        <NavLink
                          to="/watchlist"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-400"
                              : "hover:text-blue-400 transition-colors"
                          }
                        >
                          Watchlist
                        </NavLink>
                      </li>
                      <li className="text-white font-bold">
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-400"
                              : "hover:text-blue-400 transition-colors"
                          }
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li className="text-white font-bold">
                        <button
                          onClick={handleSignOut}
                          className="cursor-pointer text-white font-bold "
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  )}
                  {/* Show Join Now only when user is NOT logged in */}
                  {!user && (
                    <li className="text-white font-bold">
                      <a
                        href="#market"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-300" : " hover:text-blue-300"
                          }  text-white  transition-colors`
                        }
                      >
                        Market
                      </a>
                    </li>
                  )}

                  {/* Show Join Now only when user is NOT logged in */}
                  {!user && (
                    <li className="text-white font-bold">
                      <NavLink
                        to="/signin"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-300" : " hover:text-blue-300"
                          }  text-white  transition-colors`
                        }
                      >
                        Join Now
                      </NavLink>
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
          {/* </> */}

          {/* Search Bar Section */}
          <div className="max-w-full">
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
