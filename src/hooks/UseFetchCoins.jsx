import { useState, useEffect } from 'react';
import coinGeckoAPI from '../services/Coingecko';

const useFetchCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      // Start with top 50 coins only for faster initial load
      const data = await coinGeckoAPI.fetchTopCoins('usd', 50);
      setCoins(data);
      setError(null);
      
      // Load more coins in background after initial render
      setTimeout(async () => {
        try {
          const allData = await coinGeckoAPI.fetchTopCoins('usd', 250);
          setCoins(allData);
        } catch (err) {
          console.warn('Failed to load extended coin list:', err);
        }
      }, 1000);
      
    } catch (err) {
      setError('Failed to fetch cryptocurrency data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return { coins, loading, error, refetch: fetchCoins };
};

export default useFetchCoins;