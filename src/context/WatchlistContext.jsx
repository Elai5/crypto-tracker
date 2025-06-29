/** @format */

// WatchlistContext.jsx
import React, { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = async (coinId) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("User not authenticated");
      return;
    }

    const { error } = await supabase
      .from("watchlist")
      .insert({ user_id: user.id, coin_id: coinId });

    if (error) {
      console.error("Error adding to watchlist:", error);
    } else {
      setWatchlist((prev) => [...prev, coinId]);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
