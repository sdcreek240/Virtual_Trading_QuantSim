import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, AssetType, TradeSide, UserRole, Decimal } from "@prisma/client";
import { createHash } from "crypto";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hashPassword(plain: string): string {
  return createHash("sha256").update(plain).digest("hex");
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}

// ---------------------------------------------------------------------------
// Data Constants
// ---------------------------------------------------------------------------

const ASSETS = [
  { symbol: "AAPL", name: "Apple Inc.", type: AssetType.STOCK, exchange: "NASDAQ", sector: "Technology", industry: "Consumer Electronics" },
  { symbol: "MSFT", name: "Microsoft Corporation", type: AssetType.STOCK, exchange: "NASDAQ", sector: "Technology", industry: "Software—Infrastructure" },
  { symbol: "GOOGL", name: "Alphabet Inc.", type: AssetType.STOCK, exchange: "NASDAQ", sector: "Technology", industry: "Internet Content & Information" },
  { symbol: "AMZN", name: "Amazon.com Inc.", type: AssetType.STOCK, exchange: "NASDAQ", sector: "Consumer Cyclical", industry: "Internet Retail" },
  { symbol: "TSLA", name: "Tesla Inc.", type: AssetType.STOCK, exchange: "NASDAQ", sector: "Consumer Cyclical", industry: "Auto Manufacturers" },
  { symbol: "NVDA", name: "NVIDIA Corporation", type: AssetType.STOCK, exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", type: AssetType.STOCK, exchange: "NYSE", sector: "Financial Services", industry: "Banks—Diversified" },
  { symbol: "XOM", name: "Exxon Mobil Corporation", type: AssetType.STOCK, exchange: "NYSE", sector: "Energy", industry: "Oil & Gas Integrated" },
  { symbol: "BTC-USD", name: "Bitcoin", type: AssetType.CRYPTO, exchange: null, sector: "Technology", industry: "Digital Assets" },
  { symbol: "ETH-USD", name: "Ethereum", type: AssetType.CRYPTO, exchange: null, sector: "Technology", industry: "Digital Assets" },
  { symbol: "SOL-USD", name: "Solana", type: AssetType.CRYPTO, exchange: null, sector: "Technology", industry: "Digital Assets" },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", type: AssetType.ETF, exchange: "NYSE", sector: "Financial Services", industry: "Exchange Traded Fund" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", type: AssetType.ETF, exchange: "NASDAQ", sector: "Financial Services", industry: "Exchange Traded Fund" },
];

const MARKET_DATA = [
  { symbol: "AAPL", price: 213.45, volume: 58200000, high24h: 215.80, low24h: 211.20, changePercent: 1.23 },
  { symbol: "MSFT", price: 415.30, volume: 22100000, high24h: 418.00, low24h: 412.50, changePercent: 0.87 },
  { symbol: "GOOGL", price: 176.80, volume: 19400000, high24h: 178.50, low24h: 174.90, changePercent: -0.45 },
  { symbol: "AMZN", price: 195.60, volume: 31700000, high24h: 197.20, low24h: 193.80, changePercent: 1.05 },
  { symbol: "TSLA", price: 248.90, volume: 87300000, high24h: 255.00, low24h: 244.10, changePercent: -2.31 },
  { symbol: "NVDA", price: 875.20, volume: 43500000, high24h: 882.00, low24h: 868.50, changePercent: 3.14 },
  { symbol: "JPM", price: 221.75, volume: 11200000, high24h: 223.40, low24h: 220.10, changePercent: 0.62 },
  { symbol: "XOM", price: 118.30, volume: 9800000, high24h: 119.50, low24h: 117.20, changePercent: -0.28 },
  { symbol: "BTC-USD", price: 84250.00, volume: 28400000000, high24h: 85800.00, low24h: 82100.00, changePercent: 2.87 },
  { symbol: "ETH-USD", price: 3420.50, volume: 9100000000, high24h: 3510.00, low24h: 3380.00, changePercent: 1.54 },
  { symbol: "SOL-USD", price: 148.75, volume: 2300000000, high24h: 153.20, low24h: 145.60, changePercent: -1.22 },
  { symbol: "SPY", price: 548.90, volume: 72100000, high24h: 551.20, low24h: 546.30, changePercent: 0.94 },
  { symbol: "QQQ", price: 468.40, volume: 41300000, high24h: 471.00, low24h: 465.80, changePercent: 1.18 },
];

const USERS = [
  { email: "aidan@quantsim.dev", username: "aidan", passwordHash: hashPassword("password123"), balance: new Decimal(74320.50), role: UserRole.ADMIN },
  { email: "alice@quantsim.dev", username: "alice_trades", passwordHash: hashPassword("password123"), balance: new Decimal(100000.00), role: UserRole.USER },
  { email: "bob@quantsim.dev", username: "bob_the_bull", passwordHash: hashPassword("password123"), balance: new Decimal(12450.75), role: UserRole.USER },
];

const TRADES_BY_USER: Record<string, any[]> = {
  aidan: [
    { symbol: "AAPL", side: TradeSide.BUY, quantity: 20, price: 195.10, createdAt: daysAgo(30) },
    { symbol: "AAPL", side: TradeSide.BUY, quantity: 10, price: 200.50, createdAt: daysAgo(15) },
    { symbol: "AAPL", side: TradeSide.SELL, quantity: 5, price: 210.00, createdAt: daysAgo(5) },
    { symbol: "NVDA", side: TradeSide.BUY, quantity: 5, price: 820.00, createdAt: daysAgo(20) },
    { symbol: "BTC-USD", side: TradeSide.BUY, quantity: 0.25, price: 78000, createdAt: daysAgo(25) },
    { symbol: "BTC-USD", side: TradeSide.BUY, quantity: 0.10, price: 81500, createdAt: daysAgo(10) },
    { symbol: "SPY", side: TradeSide.BUY, quantity: 10, price: 530.00, createdAt: daysAgo(45) },
  ],
  bob_the_bull: [
    { symbol: "TSLA", side: TradeSide.BUY, quantity: 50, price: 220.00, createdAt: daysAgo(40) },
    { symbol: "TSLA", side: TradeSide.SELL, quantity: 10, price: 240.00, createdAt: daysAgo(20) },
    { symbol: "TSLA", side: TradeSide.BUY, quantity: 20, price: 235.00, createdAt: daysAgo(10) },
    { symbol: "ETH-USD", side: TradeSide.BUY, quantity: 5.5, price: 3000.00, createdAt: daysAgo(15) },
    { symbol: "QQQ", side: TradeSide.BUY, quantity: 15, price: 450.00, createdAt: daysAgo(5) },
  ]
};

const WATCHLISTS: Record<string, string[]> = {
  aidan: ["TSLA", "SOL-USD", "MSFT", "BTC-USD"],
  alice_trades: ["AAPL", "GOOGL", "AMZN"],
  bob_the_bull: ["ETH-USD", "NVDA", "JPM"],
};

// ---------------------------------------------------------------------------
// Logic
// ---------------------------------------------------------------------------

function generatePriceHistory(symbol: string, basePrice: number, days: number) {
  const history = [];
  let currentPrice = basePrice * Math.pow(0.98, days); // Start lower and walk up to current
  
  for (let i = days; i >= 0; i--) {
    const date = daysAgo(i);
    const variance = (Math.random() - 0.45) * 0.04; // Slightly biased upwards
    const open = currentPrice;
    const close = currentPrice * (1 + variance);
    const high = Math.max(open, close) * (1 + Math.random() * 0.015);
    const low = Math.min(open, close) * (1 - Math.random() * 0.015);
    
    history.push({
      symbol,
      open: new Decimal(open.toFixed(4)),
      high: new Decimal(high.toFixed(4)),
      low: new Decimal(low.toFixed(4)),
      close: new Decimal(close.toFixed(4)),
      volume: new Decimal((Math.random() * 10000000 + 1000000).toFixed(0)),
      timestamp: date,
      interval: "1d",
    });
    currentPrice = close;
  }
  return history;
}

async function main() {
  console.log("🌱 Starting full database seed...");

  // 1. Seed Assets
  console.log("  → Seeding assets...");
  for (const asset of ASSETS) {
    await prisma.asset.upsert({
      where: { symbol: asset.symbol },
      update: asset,
      create: asset,
    });
  }

  // 2. Seed Market Data & History
  console.log("  → Seeding market data and price history...");
  for (const md of MARKET_DATA) {
    await prisma.marketData.upsert({
      where: { symbol: md.symbol },
      update: {
        price: new Decimal(md.price),
        volume: new Decimal(md.volume),
        high24h: new Decimal(md.high24h),
        low24h: new Decimal(md.low24h),
        changePercent: new Decimal(md.changePercent),
      },
      create: {
        symbol: md.symbol,
        price: new Decimal(md.price),
        volume: new Decimal(md.volume),
        high24h: new Decimal(md.high24h),
        low24h: new Decimal(md.low24h),
        changePercent: new Decimal(md.changePercent),
      },
    });

    // Seed 30 days of history for ALL assets
    const history = generatePriceHistory(md.symbol, md.price, 30);
    for (const h of history) {
      await prisma.priceHistory.upsert({
        where: { 
            symbol_timestamp_interval: { 
                symbol: h.symbol, 
                timestamp: h.timestamp, 
                interval: h.interval 
            } 
        },
        update: h,
        create: h,
      });
    }
  }

  // 3. Seed Users, Trades, Portfolios, and Watchlists
  console.log("  → Seeding users and deriving portfolios...");
  for (const userData of USERS) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: userData,
      create: userData,
    });

    // Clear existing dynamic data to ensure a fresh derived state
    await prisma.trade.deleteMany({ where: { userId: user.id } });
    await prisma.portfolio.deleteMany({ where: { userId: user.id } });
    await prisma.watchlist.deleteMany({ where: { userId: user.id } });

    // Seed Watchlist
    const watchlistSymbols = WATCHLISTS[user.username] || [];
    for (const sym of watchlistSymbols) {
        await prisma.watchlist.create({
            data: { userId: user.id, symbol: sym }
        });
    }

    // Seed Trades & Calculate Portfolio
    const trades = TRADES_BY_USER[user.username] ?? [];
    const portfolioMap: Record<string, { quantity: number; totalCost: number }> = {};

    for (const t of trades) {
      const total = new Decimal(t.quantity * t.price);
      await prisma.trade.create({
        data: {
          userId: user.id,
          symbol: t.symbol,
          side: t.side,
          quantity: new Decimal(t.quantity),
          price: new Decimal(t.price),
          total: total,
          createdAt: t.createdAt,
        },
      });

      // Portfolio tracking
      if (!portfolioMap[t.symbol]) {
        portfolioMap[t.symbol] = { quantity: 0, totalCost: 0 };
      }
      const p = portfolioMap[t.symbol];
      if (t.side === TradeSide.BUY) {
        p.quantity += t.quantity;
        p.totalCost += t.quantity * t.price;
      } else {
        // Simple weighted average for cost basis reduction
        const avgPrice = p.totalCost / p.quantity;
        p.quantity -= t.quantity;
        p.totalCost -= avgPrice * t.quantity;
      }
    }

    // Save derived portfolio
    for (const [symbol, data] of Object.entries(portfolioMap)) {
      if (data.quantity > 0) {
        await prisma.portfolio.create({
          data: {
            userId: user.id,
            symbol: symbol,
            quantity: new Decimal(data.quantity.toFixed(8)),
            avgPrice: new Decimal((data.totalCost / data.quantity).toFixed(4)),
          },
        });
      }
    }
  }

  console.log("\n✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
