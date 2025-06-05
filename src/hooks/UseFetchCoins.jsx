// hooks/useFetchCoins.js
import { useState, useEffect } from 'react';
import coinGeckoAPI from '../services/Coingecko';

const useFetchCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const data = await coinGeckoAPI.fetchTopCoins();
      setCoins(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    // const interval = setInterval(fetchCoins, 30000); // Refresh every 30 seconds
    // return () => clearInterval(interval);
  }, []);

  return { coins, loading, error, refetch: fetchCoins };
};

export default useFetchCoins;