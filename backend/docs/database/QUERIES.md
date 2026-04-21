# Common Queries Guide

This guide provides examples of common queries used in the QuantSim platform using both raw SQL and Prisma ORM.

## 1. Get User Portfolio with Current Market Prices
Retrieve all holdings for a user, joined with the latest price from `MarketData`.

### Prisma
```typescript
const portfolio = await prisma.portfolio.findMany({
  where: { userId: "USER_ID" },
  include: {
    user: {
      select: { username: true }
    }
  }
});

// Since MarketData isn't directly related to Portfolio in the schema, 
// you can fetch prices separately or join via Asset.
const symbols = portfolio.map(p => p.symbol);
const prices = await prisma.marketData.findMany({
  where: { symbol: { in: symbols } }
});
```

### SQL
```sql
SELECT p.symbol, p.quantity, p.avgPrice, m.price AS currentPrice
FROM "Portfolio" p
JOIN "MarketData" m ON p.symbol = m.symbol
WHERE p."userId" = 'USER_ID';
```

---

## 2. Calculate Total Portfolio Value
Calculates the current market value of all holdings plus the user's cash balance.

### Prisma
```typescript
const user = await prisma.user.findUnique({
  where: { id: "USER_ID" },
  include: { portfolios: true }
});

const symbols = user.portfolios.map(p => p.symbol);
const marketData = await prisma.marketData.findMany({
  where: { symbol: { in: symbols } }
});

const marketValue = user.portfolios.reduce((total, p) => {
  const price = marketData.find(m => m.symbol === p.symbol)?.price || 0;
  return total + (p.quantity * price);
}, 0);

const totalValue = marketValue + user.balance;
```

### SQL
```sql
SELECT 
    u.id, 
    u.balance + COALESCE(SUM(p.quantity * m.price), 0) AS total_value
FROM "User" u
LEFT JOIN "Portfolio" p ON u.id = p."userId"
LEFT JOIN "MarketData" m ON p.symbol = m.symbol
WHERE u.id = 'USER_ID'
GROUP BY u.id, u.balance;
```

---

## 3. Find Top Gainers / Losers
List assets by their 24h percentage change.

### Prisma
```typescript
const movers = await prisma.marketData.findMany({
  orderBy: { changePercent: 'desc' }, // 'asc' for losers
  take: 5
});
```

### SQL
```sql
SELECT symbol, price, "changePercent"
FROM "MarketData"
ORDER BY "changePercent" DESC
LIMIT 5;
```

---

## 4. Get Trade History with User Details
List the last 20 trades globally with usernames.

### Prisma
```typescript
const trades = await prisma.trade.findMany({
  orderBy: { createdAt: 'desc' },
  take: 20,
  include: { user: { select: { username: true } } }
});
```

### SQL
```sql
SELECT t.symbol, t.side, t.quantity, t.price, t."createdAt", u.username
FROM "Trade" t
JOIN "User" u ON t."userId" = u.id
ORDER BY t."createdAt" DESC
LIMIT 20;
```
