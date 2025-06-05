import React from 'react';

const Sidebar = ({ coins, onCoinSelect, selectedCoin }) => {
  // Get top 50 coins
  const top50Coins = coins.slice(0, 50);

  return (
    <div className="rounded-lg fixed top-24 sm:top-28 left-2 sm:left-4 w-72 sm:w-80 h-[calc(100vh-7rem)] bg-gray-800 shadow-xl border border-gray-700 z-40 flex flex-col">
      {/* Header - Fixed at top */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-700 flex-shrink-0">
        <h3 className="text-lg font-semibold text-white">
          Top Cryptocurrencies
        </h3>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 sm:p-4 space-y-2">
          {top50Coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => onCoinSelect(coin)}
              className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                selectedCoin?.id === coin.id
                  ? 'bg-blue-900 bg-opacity-30 border border-blue-600'
                  : 'hover:bg-gray-700 hover:shadow-md'
              }`}
            >
              <img 
                src={coin.image} 
                alt={coin.name} 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-white text-sm sm:text-base">
                  {coin.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-medium text-xs sm:text-sm text-white">
                  ${coin.current_price.toFixed(2)}
                </p>
                <p className={`text-xs font-medium ${
                  coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom padding to ensure last item is visible */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default Sidebar;