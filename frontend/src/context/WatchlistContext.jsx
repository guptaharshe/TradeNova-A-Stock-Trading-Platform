import { createContext, useContext, useEffect, useState, useCallback } from "react";
import watchlistService from "../services/watchlistService";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch watchlist from API when user is authenticated
  const fetchWatchlist = useCallback(async () => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    try {
      setLoading(true);
      const data = await watchlistService.getWatchlist();
      const list = data?.watchlist || data || [];
      setWatchlist(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      // Fall back to localStorage if API fails
      const stored = localStorage.getItem("watchlist");
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch watchlist when user changes
  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  // Add to watchlist via API
  const addToWatchlist = async (stock) => {
    // Optimistic update
    setWatchlist((prev) => {
      if (prev.some((s) => s.symbol === stock.symbol || s.symbol === stock.name)) return prev;
      return [...prev, stock];
    });

    try {
      await watchlistService.addToWatchlist(stock.symbol || stock.name);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      // Revert on error
      setWatchlist((prev) => prev.filter((s) => s.symbol !== stock.symbol && s.symbol !== stock.name));
      throw error;
    }
  };

  // Remove from watchlist via API
  const removeFromWatchlist = async (stockIdOrSymbol) => {
    const stockToRemove = watchlist.find(
      (s) => s.id === stockIdOrSymbol || s.symbol === stockIdOrSymbol || s._id === stockIdOrSymbol
    );

    if (!stockToRemove) return;

    // Optimistic update
    setWatchlist((prev) => prev.filter((s) =>
      s.id !== stockIdOrSymbol && s.symbol !== stockIdOrSymbol && s._id !== stockIdOrSymbol
    ));

    try {
      await watchlistService.removeFromWatchlist(stockToRemove.symbol);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      // Revert on error
      setWatchlist((prev) => [...prev, stockToRemove]);
      throw error;
    }
  };

  // Check if stock is in watchlist
  const isInWatchlist = (symbolOrId) => {
    if (!Array.isArray(watchlist)) return false;
    return watchlist.some(
      (s) => s.symbol === symbolOrId || s.id === symbolOrId || s._id === symbolOrId
    );
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        loading,
        refetch: fetchWatchlist
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
