// components/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, coins = [] }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 0 && coins.length > 0) {
      const filtered = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, coins]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value) => {
    onSearchChange(value);
    if (value.length === 0) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (coin) => {
    onSearchChange(coin.name);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const clearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-blue-600 text-white px-1 rounded">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className="relative m-2 font-primary" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for coins..."
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border text-white bg-gray-800 border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          {suggestions.map((coin, index) => (
            <div
              key={coin.id}
              onClick={() => handleSuggestionClick(coin)}
              className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors ${
                index === activeSuggestion 
                  ? 'bg-gray-700 border-l-2 border-blue-500' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <img 
                src={coin.image} 
                alt={coin.name} 
                className="w-6 h-6 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">
                    {highlightMatch(coin.name, searchTerm)}
                  </span>
                  <span className="text-gray-400 text-sm uppercase">
                    {highlightMatch(coin.symbol, searchTerm)}
                  </span>
                </div>
                {coin.current_price && (
                  <div className="text-sm text-gray-400">
                    ${coin.current_price.toLocaleString()}
                  </div>
                )}
              </div>
              {coin.price_change_percentage_24h !== undefined && (
                <span className={`text-sm font-medium ${
                  coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {coin.price_change_percentage_24h > 0 ? '+' : ''}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;