// services/coingecko.js
const coinGeckoAPI = {
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'accept': 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
  },

  async fetchTopCoins(currency = 'usd', limit = 250) {
    try {
      const response = await fetch(
        `${this.baseURL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
        { headers: this.headers }
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching coins:', error);
      return [];
    }
  },

  async fetchCoinHistory(coinId, days = 7) {
    try {
      const response = await fetch(
        `${this.baseURL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
        { headers: this.headers }
      );
      const data = await response.json();
      return data.prices?.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleDateString(),
        price: price
      })) || [];
    } catch (error) {
      console.error('Error fetching coin history:', error);
      return [];
    }
  }
};

export default coinGeckoAPI;