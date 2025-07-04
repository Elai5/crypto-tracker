import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CoinRow = ({ coin, onClick, darkMode, isSelected }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap?.toLocaleString()}`;
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume?.toLocaleString()}`;
  };

  return (
    <tr 
      onClick={() => onClick(coin)}
      className={`cursor-pointer transition-colors font-primary hover:bg-opacity-50 ${
        isSelected 
          ? darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'
          : darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
      }`}
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {coin.market_cap_rank}
          </span>
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          <div>
            <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {coin.name}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {coin.symbol.toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className={`px-6 py-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {formatPrice(coin.current_price)}
      </td>
      <td className={`px-6 py-4 ${
        coin.price_change_percentage_1h_in_currency >= 0 
          ? 'text-green-500' 
          : 'text-red-500'
      }`}>
        <div className="flex items-center">
          {coin.price_change_percentage_1h_in_currency >= 0 ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {Math.abs(coin.price_change_percentage_1h_in_currency || 0).toFixed(2)}%
        </div>
      </td>
      <td className={`px-6 py-4 ${
        coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        <div className="flex items-center">
          {coin.price_change_percentage_24h >= 0 ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
        </div>
      </td>
      <td className={`px-6 py-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {formatVolume(coin.total_volume)}
      </td>
      <td className={`px-6 py-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {formatMarketCap(coin.market_cap)}
      </td>
    </tr>
  );
};

export default CoinRow;