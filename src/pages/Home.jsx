// pages/Home.jsx
import React from 'react'
import { useState } from 'react';
import useFetchCoins from '../hooks/UseFetchCoins';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CoinDetails from '../components/CoinDetails';
import CoinRow from '../components/CoinRow';
import Footer from '../components/Footer';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { coins, loading, error } = useFetchCoins();

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors bg-gray-900">
      {/* Fixed Header */}
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        darkMode={true}
      />

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-24 sm:pt-28">
        <div className="container mx-auto px-4 py-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar 
                coins={coins}
                onCoinSelect={setSelectedCoin}
                selectedCoin={selectedCoin}
                darkMode={true}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Coin Details */}
              <CoinDetails coin={selectedCoin} darkMode={true} />

              {/* Top Coins Table */}
              <div className="rounded-lg overflow-hidden bg-gray-800 shadow-lg">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">
                    Top 50 Cryptocurrencies
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          Coin
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          1h
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          24h
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          Volume
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          Market Cap
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredCoins.map((coin) => (
                        <CoinRow
                          key={coin.id}
                          coin={coin}
                          onClick={setSelectedCoin}
                          darkMode={true}
                          isSelected={selectedCoin?.id === coin.id}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer darkMode={true} />
        </div>
      </div>
    </div>
  );
}

export default Home;