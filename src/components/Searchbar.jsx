// components/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange,  }) => (
  <div className="relative mb-6 ">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
    <input
      type="text"
      placeholder="Search cryptocurrencies..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className={`w-1/2  pl-10 pr-4 py-3 rounded-lg border text-white bg-gray-800 border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
    />
  </div>
);

export default SearchBar;