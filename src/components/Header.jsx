/** @format */

import React from "react";
import SearchBar from "../components/Searchbar";

import { NavLink } from "react-router-dom";

const Header = ({ searchTerm, onSearchChange, coins = [], onCoinSelect }) => {
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
                <li className="text-white font-bold">
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Market
                  </NavLink>
                </li>
                <li className="text-white font-bold">
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Watchlist
                  </NavLink>
                </li>
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
