/** @format */

import React from "react";

const Watchlist = () => {
  const watchlistCoins = [];

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white pt-30">
      <h1 className="text-2xl font-semibold mb-4">My Watchlist</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                Coin
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 hidden lg:table-cell">
                1h
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                24h
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 hidden xl:table-cell">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {watchlistCoins.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                  Your watchlist is empty. ⭐ Click the star on a coin to add it
                  here.
                </td>
              </tr>
            ) : (
              watchlistCoins.map((coin) => (
                <tr key={coin.id}>
                  <td className="px-6 py-4">{coin.name}</td>
                  <td className="px-6 py-4">${coin.current_price}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {coin.price_change_percentage_1h_in_currency}%
                  </td>
                  <td className="px-6 py-4">
                    {coin.price_change_percentage_24h}%
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    ${coin.total_volume}
                  </td>
                  <td className="px-6 py-4">${coin.market_cap}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
