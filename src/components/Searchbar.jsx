// components/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange,  }) => (
  <div className="relative  font-primary ">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
    <input
      type="text"
      placeholder="Search coins..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className={`w-3/4  pl-10 pr-4 py-3 rounded-lg border text-white bg-gray-900 border-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors`}
    />
  </div>
);

export default SearchBar;