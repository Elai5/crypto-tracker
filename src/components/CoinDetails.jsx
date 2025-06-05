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
      <div className="rounded-lg font-primary p-8 text-center bg-gray-800 text-gray-400">
        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Select a cryptocurrency to view details</p>
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

  return (
    <div className="rounded-lg p-6 bg-gray-800 shadow-lg">
      <div className="flex items-center space-x-4 mb-6">
        <img src={coin.image} alt={coin.name} className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            {coin.name}
          </h2>
          <p className="text-gray-400">
            {coin.symbol.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-400">
              Current Price
            </span>
          </div>
          <p className="text-lg font-semibold text-white">
            {formatPrice(coin.current_price)}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-400">
              24h Change
            </span>
          </div>
          <p className={`text-lg font-semibold ${
            coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-400">
              Market Cap
            </span>
          </div>
          <p className="text-lg font-semibold text-white">
            ${(coin.market_cap / 1e9).toFixed(2)}B
          </p>
        </div>

        <div className="p-4 rounded-lg bg-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-400">
              24h Volume
            </span>
          </div>
          <p className="text-lg font-semibold text-white">
            ${(coin.total_volume / 1e6).toFixed(2)}M
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-white">
          7-Day Price Chart
        </h3>
        <CoinChart 
          chartData={chartData} 
          darkMode={true} 
          loading={chartLoading} 
        />
      </div>
    </div>
  );
};

export default CoinDetails;