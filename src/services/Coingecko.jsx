const coinGeckoAPI = {
  baseURL: 'https://api.coingecko.com/api/v3',
  cache: new Map(),
  cacheTimeout: 60000, // 1 minute cache
  
  headers: {
    'accept': 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
  },

  async fetchTopCoins(currency = 'usd', limit = 50) {
    const cacheKey = `coins_${currency}_${limit}`;
    const cached = this.cache.get(cacheKey);
    
    // Return cached data if available and not expired
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      // Removed sparkline for faster loading - only get essential data
      const response = await fetch(
        `${this.baseURL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&price_change_percentage=1h,24h,7d`,
        { 
          headers: this.headers,
          // Add request timeout
          signal: AbortSignal.timeout(10000)
        }
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching coins:', error);
      
      // Return cached data if available, even if expired
      if (cached) {
        console.warn('Using stale cached data due to fetch error');
        return cached.data;
      }
      
      return [];
    }
  },

  async fetchCoinHistory(coinId, days = 7) {
    const cacheKey = `history_${coinId}_${days}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `${this.baseURL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
        { 
          headers: this.headers,
          signal: AbortSignal.timeout(8000)
        }
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      const processedData = data.prices?.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleDateString(),
        price: price
      })) || [];
      
      this.cache.set(cacheKey, {
        data: processedData,
        timestamp: Date.now()
      });
      
      return processedData;
    } catch (error) {
      console.error('Error fetching coin history:', error);
      
      if (cached) {
        return cached.data;
      }
      
      return [];
    }
  },

  // Clear cache method
  clearCache() {
    this.cache.clear();
  }
};

export default coinGeckoAPI;