import axios from 'axios';
import { fetchWithRateLimit } from './apiUtils';

const BASE_URL_COINGECKO = '/api/coingecko';

export const fetchTradingPairs = async () => {
  const key = 'tradingPairs';
  const fetchFunction = async () => {
    const response = await axios.get(`${BASE_URL_COINGECKO}/coins/markets`, {
      params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 10, page: 1 },
    });
    return response.data.map(coin => ({
      id: coin.id,
      baseCurrency: coin.symbol.toUpperCase(),
      quoteCurrency: "USDT",
      price: coin.current_price.toString(),
      priceChange: coin.price_change_percentage_24h || 0,
    }));
  };

  try {
    return await fetchWithRateLimit(key, fetchFunction);
  } catch (error) {
    console.error('Error fetching trading pairs:', error.message);
    return [];
  }
};

export const fetchMarketData = async (perPage = 10, page = 1) => {
  const key = `marketData:${perPage}:${page}`;
  const fetchFunction = async () => {
    const response = await axios.get(`${BASE_URL_COINGECKO}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        price_change_percentage: '24h', // Include 24h price change
      },
    });
    return response.data.map(coin => ({
      baseCurrency: coin.symbol.toUpperCase(),
      quoteCurrency: 'USDT',
      price: coin.current_price.toString(),
      priceChange: coin.price_change_percentage_24h || 0,
      volume: coin.total_volume.toString(),
      high24h: coin.high_24h.toString(),
      low24h: coin.low_24h.toString(),
    }));
  };

  try {
    return await fetchWithRateLimit(key, fetchFunction);
  } catch (error) {
    console.error('Error fetching market data:', error.message);
    return [];
  }
};

export const fetchOrderBook = async (coinId = 'bitcoin') => {
  const key = `orderBook:${coinId}`;
  const fetchFunction = async () => {
    const response = await axios.get(`${BASE_URL_COINGECKO}/exchanges/binance/tickers`, {
      params: { coin_ids: coinId },
    });
    const tickers = response.data.tickers || [];
    return {
      asks: tickers.map((ticker, index) => ({
        price: ticker.last || 0,
        volume: ticker.volume || 0,
        total: (ticker.last || 0) * (ticker.volume || 0),
      })),
      bids: tickers.map((ticker, index) => ({
        price: ticker.last || 0,
        volume: ticker.volume || 0,
        total: (ticker.last || 0) * (ticker.volume || 0),
      })),
    };
  };

  try {
    return await fetchWithRateLimit(key, fetchFunction);
  } catch (error) {
    console.error('Error fetching order book:', error.message);
    return { asks: [], bids: [] };
  }
};

export const fetchCandlestickData = async (coinId = 'bitcoin', days = '1') => {
  const key = `candlestick:${coinId}:${days}`;
  const fetchFunction = async () => {
    // Fetch OHLC data
    const ohlcResponse = await axios.get(`${BASE_URL_COINGECKO}/coins/${coinId}/ohlc`, {
      params: { vs_currency: 'usd', days },
    });

    // Fetch volume data
    const volumeResponse = await axios.get(`${BASE_URL_COINGECKO}/coins/${coinId}/market_chart`, {
      params: { vs_currency: 'usd', days },
    });

    // Map OHLC data
    const ohlcData = ohlcResponse.data.map(d => ({
      timestamp: d[0],
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }));

    // Map volume data
    const volumeData = volumeResponse.data.total_volumes;

    // Merge OHLC and volume data based on timestamps
    return ohlcData.map((candle, index) => {
      // Find the closest volume data point by timestamp
      const closestVolume = volumeData.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev[0] - candle.timestamp);
        const currDiff = Math.abs(curr[0] - candle.timestamp);
        return currDiff < prevDiff ? curr : prev;
      }, volumeData[0]);
      return {
        ...candle,
        volume: closestVolume ? closestVolume[1] : 0, // Volume in USD
      };
    });
  };

  try {
    return await fetchWithRateLimit(key, fetchFunction);
  } catch (error) {
    console.error('Error fetching candlestick data:', error.message);
    return [];
  }
};

export const fetchWalletData = async (ids) => {
  const key = `wallet:${ids.join(',')}`;
  const fetchFunction = async () => {
    const response = await axios.get(`${BASE_URL_COINGECKO}/simple/price`, {
      params: { ids: ids.join(','), vs_currencies: 'usd' },
    });
    return response.data;
  };

  try {
    return await fetchWithRateLimit(key, fetchFunction);
  } catch (error) {
    console.error('Error fetching wallet data:', error.message);
    return {};
  }
};