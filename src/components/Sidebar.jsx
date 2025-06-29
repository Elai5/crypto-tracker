/** @format */

import React, { memo, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const CoinRow = memo(({ data, index, style }) => {
  const coin = data.coins[index];
  const isSelected = data.selectedCoinId === coin.id;

  return (
    <div
      style={style}
      onClick={() => data.onCoinSelect(coin)}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "bg-blue-900 bg-opacity-30 border border-blue-600"
          : "hover:bg-gray-700"
      }`}
    >
      <img
        src={coin.image}
        alt={coin.name}
        className="w-8 h-8 rounded-full flex-shrink-0"
        loading="lazy"
        // Add error handling for images
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate text-white">{coin.name}</p>
        <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-medium text-sm text-white">
          $
          {coin.current_price?.toFixed(coin.current_price < 1 ? 6 : 2) ||
            "0.00"}
        </p>
        <p
          className={`text-xs font-medium ${
            (coin.price_change_percentage_24h || 0) >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {(coin.price_change_percentage_24h || 0) >= 0 ? "+" : ""}
          {coin.price_change_percentage_24h?.toFixed(2) || "0.00"}%
        </p>
      </div>
    </div>
  );
});

const Sidebar = ({ coins, onCoinSelect, selectedCoin }) => {
  const topCoins = useMemo(() => coins.slice(0, 250), [coins]);

  const listData = useMemo(
    () => ({
      coins: topCoins,
      onCoinSelect,
      selectedCoinId: selectedCoin?.id,
    }),
    [topCoins, onCoinSelect, selectedCoin?.id]
  );

  return (
    <div className="rounded-lg bg-gray-800 shadow-xl border border-gray-700 flex flex-col h-[600px]">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-700 flex-shrink-0">
        <h3 className="text-lg font-semibold text-white">Cryptocurrencies</h3>
      </div>

      <div className="flex-1">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={topCoins.length}
              itemSize={70}
              width={width}
              itemData={listData}
              // Add performance optimizations
              overscanCount={5}
              useIsScrolling={true}
            >
              {CoinRow}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default Sidebar;
