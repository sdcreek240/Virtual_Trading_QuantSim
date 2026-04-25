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
  
  // Initialize Yahoo Finance client in a version-compatible way (dynamic import)
  let yf: any = null;
  try {
    const yahooMod = await import('yahoo-finance2');
    if (yahooMod?.YahooFinance) {
      yf = new yahooMod.YahooFinance();
    } else if (yahooMod?.default?.YahooFinance) {
      yf = new yahooMod.default.YahooFinance();
    } else if (typeof yahooMod === 'function') {
      yf = yahooMod;
    } else if (yahooMod?.default && typeof yahooMod.default === 'function') {
      yf = yahooMod.default;
    } else {
      yf = yahooMod?.default || yahooMod;
    }
  } catch (e) {
    console.error('❌ Failed to dynamically import yahoo-finance2:', e instanceof Error ? e.message : e);
    yf = null;
  }

  // Simple Redis heartbeat: verify connection and publish a lightweight status
  setInterval(async () => {
    try {
      const pong = await redis.ping();
      await redis.publish('market_status', JSON.stringify({status: 'HEALTHY', source: 'ingestor', timestamp: Date.now(), pong}));
      console.log('📡 Ingestor heartbeat: Redis pong=', pong);
    } catch (err) {
      console.error('❌ Ingestor heartbeat failed:', err instanceof Error ? err.message : err);
      try {
        await redis.publish('market_status', JSON.stringify({status: 'ERROR', source: 'ingestor', timestamp: Date.now()}));
      } catch (_) {}
    }
  }, 10000); // Check every 10 seconds
}

main().catch(console.error);
