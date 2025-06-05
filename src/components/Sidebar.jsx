import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ coins, onCoinSelect, selectedCoin, darkMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = 10;
  const totalPages = Math.ceil(Math.min(coins.length, 50) / coinsPerPage);
  
  // Get top 50 coins and paginate them
  const top50Coins = coins.slice(0, 50);
  const startIndex = currentPage * coinsPerPage;
  const endIndex = startIndex + coinsPerPage;
  const currentCoins = top50Coins.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Top Cryptocurrencies
      </h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {currentCoins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => onCoinSelect(coin)}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCoin?.id === coin.id
                ? darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'
                : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
          >
            <img src={coin.image} alt={coin.name} className="w-8 h-8" />
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {coin.name}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {coin.symbol.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ${coin.current_price.toFixed(2)}
              </p>
              <p className={`text-sm ${
                coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
            currentPage === 0
              ? darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
              : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Prev</span>
        </button>

        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-8 h-8 rounded-md text-sm transition-colors ${
                currentPage === i
                  ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
            currentPage === totalPages - 1
              ? darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
              : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-sm">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;