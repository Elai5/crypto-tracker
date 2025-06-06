// pages/Home.jsx
import React from 'react'
import { useState, useEffect } from 'react';
import useFetchCoins from '../hooks/UseFetchCoins';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CoinDetails from '../components/CoinDetails';
import CoinRow from '../components/CoinRow';
import Footer from '../components/Footer';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 30;
  const { coins, loading, error } = useFetchCoins();

  // Set Bitcoin as default coin when coins are loaded
  useEffect(() => {
    if (coins.length > 0 && !selectedCoin) {
      const bitcoin = coins.find(coin => coin.id === 'bitcoin') || coins[0];
      setSelectedCoin(bitcoin);
    }
  }, [coins, selectedCoin]);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);
  const startIndex = (currentPage - 1) * coinsPerPage;
  const endIndex = startIndex + coinsPerPage;
  const currentCoins = filteredCoins.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    <div className="min-h-screen transition-colors bg-gray-900 font-primary">
      {/* Fixed Header */}
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        darkMode={true}
      />

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-24 sm:pt-28">
        <div className="container mx-auto px-4 py-8">
          {/* Flex Layout for Sidebar and Coin Details */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <Sidebar 
                coins={coins}
                onCoinSelect={setSelectedCoin}
                selectedCoin={selectedCoin}
                darkMode={true}
              />
            </div>

            {/* Coin Details */}
            <div className="lg:w-2/3">
              <CoinDetails coin={selectedCoin} darkMode={true} />
            </div>
          </div>

          {/* Top Coins Table */}
          <div className="rounded-lg overflow-hidden bg-gray-800 shadow-lg">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                Top Cryptocurrencies ({filteredCoins.length} coins)
              </h3>
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
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
                  {currentCoins.map((coin) => (
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-700 flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;
                    
                    // Show first page, last page, current page, and pages around current page
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isCurrentPage
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <Footer darkMode={true} />
        </div>
      </div>
    </div>
  );
}

export default Home;