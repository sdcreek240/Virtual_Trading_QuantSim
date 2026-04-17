import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

const prisma = new (PrismaClient as any)({
  adapter,
  log: ["error", "warn"],
});

// ---------------------------------------------------------------------------
// Enums (mirrored from schema)
// ---------------------------------------------------------------------------

const AssetType = { STOCK: "STOCK", CRYPTO: "CRYPTO", ETF: "ETF" } as const;
const TradeSide = { BUY: "BUY", SELL: "SELL" } as const;
const TradeStatus = { PENDING: "PENDING", EXECUTED: "EXECUTED", CANCELLED: "CANCELLED" } as const;

type TradeSideType = typeof TradeSide[keyof typeof TradeSide];
type TradeStatusType = typeof TradeStatus[keyof typeof TradeStatus];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hashPassword(plain: string): string {
  return createHash("sha256").update(plain).digest("hex");
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// ---------------------------------------------------------------------------
// 1. Assets (matches your Asset model)
// ---------------------------------------------------------------------------

const ASSETS = [
  // Stocks
  { symbol: "AAPL", name: "Apple Inc.", type: AssetType.STOCK, exchange: "NASDAQ" },
  { symbol: "MSFT", name: "Microsoft Corporation", type: AssetType.STOCK, exchange: "NASDAQ" },
  { symbol: "GOOGL", name: "Alphabet Inc.", type: AssetType.STOCK, exchange: "NASDAQ" },
  { symbol: "AMZN", name: "Amazon.com Inc.", type: AssetType.STOCK, exchange: "NASDAQ" },
  { symbol: "TSLA", name: "Tesla Inc.", type: AssetType.STOCK, exchange: "NASDAQ" },
  { symbol: "NVDA", name: "NVIDIA Corporation", type: AssetType.STOCK, exchange: "NASDAQ" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", type: AssetType.STOCK, exchange: "NYSE" },
  { symbol: "XOM", name: "Exxon Mobil Corporation", type: AssetType.STOCK, exchange: "NYSE" },
  // Crypto
  { symbol: "BTC-USD", name: "Bitcoin", type: AssetType.CRYPTO, exchange: null },
  { symbol: "ETH-USD", name: "Ethereum", type: AssetType.CRYPTO, exchange: null },
  { symbol: "SOL-USD", name: "Solana", type: AssetType.CRYPTO, exchange: null },
  // ETFs
  { symbol: "SPY", name: "SPDR S&P 500 ETF", type: AssetType.ETF, exchange: "NYSE" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", type: AssetType.ETF, exchange: "NASDAQ" },
];

// ---------------------------------------------------------------------------
// 2. Market data (matches your MarketData model, relates to Asset via symbol)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// 3. Users
// ---------------------------------------------------------------------------

const USERS = [
  { email: "aidan@quantsim.dev", username: "aidan", passwordHash: hashPassword("password123"), balance: 74320.50 },
  { email: "alice@quantsim.dev", username: "alice_trades", passwordHash: hashPassword("password123"), balance: 100000.00 },
  { email: "bob@quantsim.dev", username: "bob_the_bull", passwordHash: hashPassword("password123"), balance: 12450.75 },
];

// ---------------------------------------------------------------------------
// 4. Trades per user
// ---------------------------------------------------------------------------

type TradeInput = {
  symbol: string;
  side: TradeSideType;
  quantity: number;
  price: number;
  createdAt: Date;
  status?: TradeStatusType;
};

const TRADES_BY_USER: Record<string, TradeInput[]> = {
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
    { symbol: "TSLA", side: TradeSide.BUY, quantity: 50, price: 220.00, createdAt: daysAgo(60) },
    { symbol: "TSLA", side: TradeSide.BUY, quantity: 30, price: 235.00, createdAt: daysAgo(40) },
    { symbol: "TSLA", side: TradeSide.SELL, quantity: 20, price: 260.00, createdAt: daysAgo(20) },
    { symbol: "ETH-USD", side: TradeSide.BUY, quantity: 3.5, price: 3100, createdAt: daysAgo(50) },
    { symbol: "ETH-USD", side: TradeSide.SELL, quantity: 1.0, price: 3350, createdAt: daysAgo(12) },
    { symbol: "AMZN", side: TradeSide.BUY, quantity: 15, price: 182.00, createdAt: daysAgo(35) },
    { symbol: "SOL-USD", side: TradeSide.BUY, quantity: 25, price: 130.00, createdAt: daysAgo(18) },
    { symbol: "SOL-USD", side: TradeSide.BUY, quantity: 15, price: 142.00, createdAt: daysAgo(8) },
  ],
};

// ---------------------------------------------------------------------------
// Derive portfolio positions from trade history
// ---------------------------------------------------------------------------

type Position = { quantity: number; totalCost: number };

function derivePortfolio(trades: TradeInput[]): Record<string, Position> {
  const positions: Record<string, Position> = {};
  for (const t of trades) {
    if (!positions[t.symbol]) positions[t.symbol] = { quantity: 0, totalCost: 0 };
    const pos = positions[t.symbol];
    if (t.side === TradeSide.BUY) {
      pos.quantity += t.quantity;
      pos.totalCost += t.quantity * t.price;
    } else {
      const costPerUnit = pos.quantity > 0 ? pos.totalCost / pos.quantity : t.price;
      pos.quantity -= t.quantity;
      pos.totalCost -= costPerUnit * t.quantity;
    }
  }
  return Object.fromEntries(
    Object.entries(positions).filter(([, p]) => p.quantity > 0.000001)
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱 Starting seed...\n");

  // 1. Seed Assets
  console.log("  → Seeding assets...");
  for (const asset of ASSETS) {
    await prisma.asset.upsert({
      where: { symbol: asset.symbol },
      update: asset,
      create: asset,
    });
  }
  console.log(`     ✓ ${ASSETS.length} assets`);

  // 2. Seed Market Data (relates to Asset via symbol)
  console.log("  → Seeding market data...");
  for (const md of MARKET_DATA) {
    await prisma.marketData.upsert({
    where: { id: md.symbol },
    update: {
        price: md.price,
        volume: md.volume,
        high24h: md.high24h,
        low24h: md.low24h,
        changePercent: md.changePercent,
    },
    create: {
        id: md.symbol,
        symbol: md.symbol,
        price: md.price,
        volume: md.volume,
        high24h: md.high24h,
        low24h: md.low24h,
        changePercent: md.changePercent,
    },
    });
  }
  console.log(`     ✓ ${MARKET_DATA.length} market snapshots`);

  // 3. Seed Users, Trades, and Portfolios
  console.log("  → Seeding users, trades, and portfolios...");
  for (const userData of USERS) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: userData,
      create: userData,
    });

    // Clear existing trades so re-runs don't duplicate
    await prisma.trade.deleteMany({ where: { userId: user.id } });

    const userTrades = TRADES_BY_USER[user.username] ?? [];

    for (const t of userTrades) {
      await prisma.trade.create({
        data: {
          userId: user.id,
          symbol: t.symbol,
          side: t.side,
          quantity: t.quantity,
          price: t.price,
          total: parseFloat((t.quantity * t.price).toFixed(2)),
          status: t.status ?? TradeStatus.EXECUTED,
          createdAt: t.createdAt,
        },
      });
    }

    const positions = derivePortfolio(userTrades);
    for (const [symbol, pos] of Object.entries(positions)) {
      const avgPrice = parseFloat((pos.totalCost / pos.quantity).toFixed(2));
      await prisma.portfolio.upsert({
        where: { userId_symbol: { userId: user.id, symbol } },
        update: { quantity: pos.quantity, avgPrice },
        create: { userId: user.id, symbol, quantity: pos.quantity, avgPrice },
      });
    }

    console.log(`     ✓ @${user.username} — ${userTrades.length} trades, ${Object.keys(positions).length} open positions`);
  }

  console.log("\n✅ Seed complete!");
  console.log("\n  Credentials (password: 'password123'):");
  console.log("  aidan         — mixed portfolio, partial sells");
  console.log("  alice_trades  — fresh account, $100k untouched");
  console.log("  bob_the_bull  — heavy trader, low cash remaining\n");
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });