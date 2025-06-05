import React from 'react';

const Sidebar = ({ coins, onCoinSelect, selectedCoin, darkMode }) => {
  // Get top 50 coins
  const top50Coins = coins.slice(0, 50);

  return (
    <div className={`rounded-lg p-4 fixed top-24 sm:top-28 left-4 w-80 h-[calc(100vh-8rem)] font-primary ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-40`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Top Cryptocurrencies
      </h3>
      
      <div className="space-y-2 h-full overflow-y-auto pb-4">
        {top50Coins.map((coin) => (
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
    </div>
  );
};

export default Sidebar;