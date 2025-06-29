/** @format */
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import coinGeckoAPI from "../services/Coingecko";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [coinDetails, setCoinDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw new Error("Authentication error: " + authError.message);
        }

        if (user) {
          const { data, error } = await supabase
            .from("profile")
            .select("id")
            .eq("user_id", user.id);

          if (error) {
            throw new Error("Error fetching watchlist: " + error.message);
          } else {
            const coinIds = data.map((item) => item.coin_id);
            setWatchlist(coinIds);
            if (coinIds.length > 0) {
              await fetchCoinDetails(coinIds);
            }
          }
        }
      } catch (err) {
        console.error("Error in fetchWatchlist:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const fetchCoinDetails = async (coinIds) => {
    try {
      // fetch the coins we need if the API supports it
      // Otherwise, filter from the top 50 as fallback
      const coins = await coinGeckoAPI.fetchTopCoins("usd", 50);
      const filteredCoins = coins.filter((coin) => coinIds.includes(coin.id));
      setCoinDetails(filteredCoins);
    } catch (error) {
      console.error("Error fetching coin details:", error);
      setError("Failed to fetch coin details");
    }
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num?.toFixed(2) || "N/A";
  };

  const formatPercentage = (percentage) => {
    if (percentage === null || percentage === undefined) return "N/A";
    const formatted = percentage.toFixed(2);
    return `${formatted > 0 ? "+" : ""}${formatted}%`;
  };

  const getPercentageColor = (percentage) => {
    if (percentage > 0) return "text-green-400";
    if (percentage < 0) return "text-red-400";
    return "text-gray-400";
  };

  const toggleWatchlist = async (coinId) => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("User not authenticated");
        return;
      }

      const isInWatchlist = watchlist.includes(coinId);

      if (isInWatchlist) {
        // Remove from watchlist
        const { error } = await supabase
          .from("watchlist")
          .delete()
          .eq("user_id", user.id)
          .eq("coin_id", coinId);

        if (error) {
          console.error("Error removing from watchlist:", error);
        } else {
          const updatedWatchlist = watchlist.filter((id) => id !== coinId);
          setWatchlist(updatedWatchlist);
          setCoinDetails(coinDetails.filter((coin) => coin.id !== coinId));
        }
      } else {
        // Add to watchlist
        const { error } = await supabase
          .from("watchlist")
          .insert({ user_id: user.id, coin_id: coinId });

        if (error) {
          console.error("Error adding to watchlist:", error);
        } else {
          setWatchlist([...watchlist, coinId]);
          // Note: You might want to refetch coin details here to get the new coin's data
        }
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 text-white pt-20">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-4">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white pt-20">
      <h1 className="text-2xl font-semibold mb-4">My Watchlist</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-3 bg-red-400 py-3 text-left text-sm font-medium text-gray-400"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                Favorite
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {watchlist.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                  Your watchlist is empty. ⭐ Click the star on a coin to add it
                  here.
                </td>
              </tr>
            ) : (
              coinDetails.map((coin) => (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleWatchlist(coin.id)}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors text-lg"
                      title="Remove from watchlist"
                    >
                      ⭐
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {coin.image && (
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-6 h-6 mr-2 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-sm text-gray-400 uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${coin.current_price?.toLocaleString() || "N/A"}
                  </td>
                  <td
                    className={`px-6 py-4 hidden lg:table-cell ${getPercentageColor(
                      coin.price_change_percentage_1h_in_currency
                    )}`}
                  >
                    {formatPercentage(
                      coin.price_change_percentage_1h_in_currency
                    )}
                  </td>
                  <td
                    className={`px-6 py-4 ${getPercentageColor(
                      coin.price_change_percentage_24h
                    )}`}
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    ${formatNumber(coin.total_volume)}
                  </td>
                  <td className="px-6 py-4">
                    ${formatNumber(coin.market_cap)}
                  </td>
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
