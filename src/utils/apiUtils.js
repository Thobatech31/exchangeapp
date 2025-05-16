// utils/apiUtils.js
const cache = new Map();
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests
let lastRequestTime = 0;

export const fetchWithRateLimit = async (key, fetchFunction) => {
  // Check cache
  if (cache.has(key)) {
    console.log(`Cache hit for ${key}`);
    return cache.get(key);
  }

  // Rate limiting: wait if necessary
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const delay = RATE_LIMIT_DELAY - timeSinceLastRequest;
    console.log(`Rate limiting: waiting ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Make the request
  try {
    lastRequestTime = Date.now();
    const data = await fetchFunction();
    cache.set(key, data);
    return data;
  } catch (error) {
    if (error.response?.status === 429) {
      // Retry after 10 seconds if rate limit is hit
      console.log('Rate limit hit, retrying after 10 seconds...');
      await new Promise(resolve => setTimeout(resolve, 10000));
      lastRequestTime = Date.now();
      const retryData = await fetchFunction();
      cache.set(key, retryData);
      return retryData;
    }
    throw error;
  }
};

// Clear cache after 5 minutes to ensure fresh data
setInterval(() => {
  cache.clear();
  console.log('Cache cleared');
}, 5 * 60 * 1000);