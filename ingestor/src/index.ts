import dotenv from 'dotenv';
import Redis from 'ioredis';
// yahoo-finance2 will be imported dynamically to handle v2/v3 API differences

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
});

async function main() {
  console.log('🚀 TiffEx Market Data Ingestor Starting...');
  
  // Initialize Yahoo adapter (separate module)
  let yahooAdapter: any = null;
  try {
    const YahooAdapter = (await import('./adapters/yahoo.adapter')).default;
    yahooAdapter = new YahooAdapter();
    await yahooAdapter.init();
  } catch (e) {
    console.warn('⚠️ Could not initialize YahooAdapter:', e instanceof Error ? e.message : e);
    yahooAdapter = null;
  }

  // Simple Redis heartbeat: verify connection and publish a lightweight status
  setInterval(async () => {
    try {
      const pong = await redis.ping();
      await redis.publish('market_status', JSON.stringify({status: 'HEALTHY', source: 'ingestor', timestamp: Date.now(), pong}));
      console.log('📡 Ingestor heartbeat: Redis pong=', pong);

      // If YahooAdapter is available, fetch a quick quote and publish it (non-blocking)
      if (yahooAdapter && yahooAdapter.initialized) {
        try {
          const q = await yahooAdapter.quote('AAPL');
          const update = { symbol: q.symbol || 'AAPL', price: q.regularMarketPrice || null, ts: Date.now() };
          await redis.publish('price_updates', JSON.stringify(update));
          console.log('📡 Yahoo quick quote published for', update.symbol);
        } catch (e) {
          console.warn('⚠️ YahooAdapter quote failed:', e instanceof Error ? e.message : e);
        }
      }

    } catch (err) {
      console.error('❌ Ingestor heartbeat failed:', err instanceof Error ? err.message : err);
      try {
        await redis.publish('market_status', JSON.stringify({status: 'ERROR', source: 'ingestor', timestamp: Date.now()}));
      } catch (_) {}
    }
  }, 10000); // Check every 10 seconds
}

main().catch(console.error);
