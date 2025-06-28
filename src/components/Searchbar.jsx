
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, coins = [], onCoinSelect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0 && coins.length > 0) {
      const filtered = coins
        .filter(coin => 
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 8) // Limit to 8 suggestions
        .map(coin => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          price: coin.current_price,
          // Include the full coin object for selection
          fullCoin: coin
        }));
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, coins]);

  // Handle keyboard navigation
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
        searchRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click - THIS IS THE KEY FIX
  const handleSuggestionClick = (suggestion) => {
    // Clear the search term
    onSearchChange('');
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    
    // Call the onCoinSelect function with the full coin object
    if (onCoinSelect && suggestion.fullCoin) {
      onCoinSelect(suggestion.fullCoin);
    }
  };

  // Clear search
  const clearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
    searchRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative font-primary">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for Coins..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="w-full pl-10 pr-10 py-3 rounded-lg border text-white bg-gray-800 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
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
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setActiveSuggestion(index)}
              className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0 ${
                index === activeSuggestion 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-750 hover:text-white'
              }`}
            >
              {/* Coin Image */}
              <img
                src={suggestion.image}
                alt={suggestion.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Coin Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium truncate">{suggestion.name}</span>
                    <span className="text-sm text-gray-400 uppercase font-mono">
                      {suggestion.symbol}
                    </span>
                  </div>
                  {suggestion.price && (
                    <span className="text-sm font-medium ml-2 flex-shrink-0">
                      ${suggestion.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Footer hint */}
          <div className="px-4 py-2 bg-gray-750 text-xs text-gray-400 border-t border-gray-600">
            Use ↑↓ to navigate, Enter to select, Esc to close
          </div>
        </div>
      )}

      {/* No results message */}
      {showSuggestions && suggestions.length === 0 && searchTerm.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50 px-4 py-3 text-gray-400 text-sm">
          No coins found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;