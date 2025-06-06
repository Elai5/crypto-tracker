// components/CoinDetails.jsx
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, BarChart3, Eye } from 'lucide-react';
import coinGeckoAPI from '../services/Coingecko';
import CoinChart from './CoinChart';

const CoinDetails = ({ coin }) => {
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    if (coin) {
      setChartLoading(true);
      coinGeckoAPI.fetchCoinHistory(coin.id, 7)
        .then(data => {
          setChartData(data);
          setChartLoading(false);
        })
        .catch(() => setChartLoading(false));
    }
  }, [coin]);

  if (!coin) {
    return (
      <div className="rounded-lg font-primary p-4 sm:p-8 text-center bg-gray-800 text-gray-400 h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col justify-center">
        <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
        <p className="text-sm sm:text-base">Select a cryptocurrency to view details</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatLargeNumber = (num, suffix) => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      // Mobile: More compact formatting
      if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(1)}B`;
      } else if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(1)}M`;
      } else if (num >= 1e3) {
        return `$${(num / 1e3).toFixed(1)}K`;
      }
      return `$${num.toFixed(0)}`;
    }
    // Desktop: Standard formatting
    return suffix === 'B' ? `$${(num / 1e9).toFixed(2)}B` : `$${(num / 1e6).toFixed(2)}M`;
  };

  return (
    <div className="rounded-lg p-3 sm:p-4 lg:p-6 bg-gray-800 shadow-lg h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col">
      {/* Header Section */}
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 flex-shrink-0">
        <img 
          src={coin.image} 
          alt={coin.name} 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" 
        />
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
            {coin.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            {coin.symbol.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Stats Grid - Responsive layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 flex-shrink-0">
        <div className="p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span className="text-xs sm:text-sm text-gray-400">
              <span className="hidden sm:inline">Current </span>Price
            </span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-white">
            {formatPrice(coin.current_price)}
          </p>
        </div>

        <div className="p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            <span className="text-xs sm:text-sm text-gray-400">
              24h<span className="hidden sm:inline"> Change</span>
            </span>
          </div>
          <p className={`text-sm sm:text-base lg:text-lg font-semibold ${
            coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {coin.price_change_percentage_24h >= 0 ? '+' : ''}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>

        <div className="p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
            <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
            <span className="text-xs sm:text-sm text-gray-400">
              Market<span className="hidden sm:inline"> Cap</span>
            </span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-white">
            {formatLargeNumber(coin.market_cap, 'B')}
          </p>
        </div>

        <div className="p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-xs sm:text-sm text-gray-400">
              24h<span className="hidden sm:inline"> Volume</span>
            </span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-white">
            {formatLargeNumber(coin.total_volume, 'M')}
          </p>
        </div>
      </div>

      {/* Chart Section - Takes remaining space */}
      <div className="flex-1 rounded-lg bg-gray-700 min-h-0 overflow-hidden">
        <div className="p-2 sm:p-3 lg:p-4 pb-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
            <span className="hidden sm:inline">7-Day </span>Price Chart
          </h3>
        </div>
        <div className="h-full pb-2 sm:pb-3 lg:pb-4">
          <CoinChart 
            chartData={chartData}
            darkMode={true}
            loading={chartLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;