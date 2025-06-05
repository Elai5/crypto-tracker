// components/Header.jsx
import React from 'react';
import SearchBar from './Searchbar';

const Header = ({ searchTerm, onSearchChange, darkMode = true }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-sm bg-opacity-95`}>
      <div className="container mx-auto px-4 py-4 font-primary">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title Section */}
          <div className="flex-shrink-0">
            <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Kipro Currency
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time cryptocurrency tracker
            </p>
          </div>

          {/* Search Bar Section */}
          <div className="flex-1 max-w-md sm:ml-8">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;