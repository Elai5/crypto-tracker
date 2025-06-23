/** @format */

import React from "react";
import { useState, useEffect, Suspense, lazy } from "react";
import useFetchCoins from "../hooks/UseFetchCoins";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Lazy load heavy components
const Sidebar = lazy(() => import("../components/Sidebar"));
const CoinDetails = lazy(() => import("../components/CoinDetails"));
const CoinRow = lazy(() => import("../components/CoinRow"));

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-700 h-4 w-3/4 mb-2 rounded"></div>
    <div className="bg-gray-700 h-4 w-1/2 rounded"></div>
  </div>
);

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { coins, loading, error } = useFetchCoins();

  // Set Bitcoin as default coin when coins are loaded
  useEffect(() => {
    if (coins.length > 0 && !selectedCoin) {
      const bitcoin = coins.find((coin) => coin.id === "bitcoin") || coins[0];
      setSelectedCoin(bitcoin);
    }
  }, [coins, selectedCoin]);

  // Updated handleCoinSelect function
  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
    // Clear search term when a coin is selected
    setSearchTerm("");
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topCoins = filteredCoins.slice(0, 20);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white font-primary">
            Loading cryptocurrency data...
          </p>
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
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        darkMode={true}
        coins={coins}
        onCoinSelect={handleCoinSelect}
      />

      <div className="pt-28 sm:pt-28">
        <div className="container mx-auto px-4 py-8 ">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="lg:w-1/3">
              <Suspense fallback={<LoadingSkeleton />}>
                <Sidebar
                  coins={coins}
                  onCoinSelect={handleCoinSelect}
                  selectedCoin={selectedCoin}
                  darkMode={true}
                />
              </Suspense>
            </div>

            <div className="lg:w-2/3">
              <Suspense fallback={<LoadingSkeleton />}>
                <CoinDetails coin={selectedCoin} darkMode={true} />
              </Suspense>
            </div>
          </div>

          {/* Optimized table rendering */}
          <div className="rounded-lg overflow-hidden bg-gray-800 shadow-lg">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Top Cryptocurrencies
                {searchTerm && (
                  <span className="text-sm text-gray-400 ml-2">
                    ({topCoins.length} results)
                  </span>
                )}
              </h3>
            </div>

            <Suspense fallback={<LoadingSkeleton />}>
              {/* Mobile layout */}
              <div className="block md:hidden">
                <div className="divide-y divide-gray-700">
                  {topCoins.map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => handleCoinSelect(coin)}
                      className={`p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
                        selectedCoin?.id === coin.id ? "bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-8 h-8 rounded-full"
                            loading="lazy"
                          />
                          <div>
                            <div className="text-white font-medium">
                              {coin.name}
                            </div>
                            <div className="text-gray-400 text-sm uppercase">
                              {coin.symbol}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            ${coin.current_price?.toLocaleString()}
                          </div>
                          <div
                            className={`text-sm ${
                              coin.price_change_percentage_24h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                            {coin.price_change_percentage_24h?.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Market Cap</div>
                          <div className="text-white">
                            ${(coin.market_cap / 1e9).toFixed(2)}B
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Volume</div>
                          <div className="text-white">
                            ${(coin.total_volume / 1e6).toFixed(2)}M
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop table layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        Coin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 hidden lg:table-cell">
                        1h
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        24h
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 hidden xl:table-cell">
                        Volume
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                        Market Cap
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {topCoins.map((coin) => (
                      <CoinRow
                        key={coin.id}
                        coin={coin}
                        onClick={handleCoinSelect}
                        darkMode={true}
                        isSelected={selectedCoin?.id === coin.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </Suspense>
          </div>

          <Footer darkMode={true} />
        </div>
      </div>
    </div>
  );
};
<Signup />;
export default Home;
