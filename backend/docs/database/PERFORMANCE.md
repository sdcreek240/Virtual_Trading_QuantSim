# Performance and Optimization Guide

Ensuring the database remains responsive as user activity grows is critical for a trading simulation.

## Current Indexes

The following indexes are already implemented in `schema.prisma`:

| Model | Index Type | Field(s) | Purpose |
| :--- | :--- | :--- | :--- |
| `User` | Unique | `email`, `username` | Fast login and lookup. |
| `Asset` | Unique | `symbol` | Fast asset validation. |
| `Portfolio`| Unique | `userId`, `symbol` | Fast lookup of specific holdings. |
| `Trade` | Index | `userId` | Faster retrieval of user trade history. |
| `Trade` | Index | `symbol` | Faster retrieval of trades by asset. |
| `MarketData`| Unique | `symbol` | Fast price lookups. |

## Recommended Additional Indexes

As the dataset grows, the following indexes are recommended:

### 1. Covered Index for Portfolio Valuation
To speed up total portfolio value calculations without hitting the main heap.
```sql
CREATE INDEX idx_portfolio_user_symbol_quantity ON "Portfolio" ("userId", "symbol", "quantity");
```

### 2. Time-Series Index for Trades
If the dashboard displays trades from "last 7 days," an index on `createdAt` will prevent full table scans.
```sql
CREATE INDEX idx_trade_created_at ON "Trade" ("createdAt" DESC);
```

## Query Optimization Tips

### 1. Avoid `N+1` Queries
In Prisma, always use `include` or `select` to fetch related data in a single query rather than looping and making individual calls.
- **Bad:** `users.map(u => prisma.trade.findMany({ where: { userId: u.id } }))`
- **Good:** `prisma.user.findMany({ include: { trades: true } })`

### 2. Select Only Needed Fields
Avoid fetching large objects (like `passwordHash`) when only the `username` and `balance` are needed for a leaderboard.
```typescript
prisma.user.findMany({
  select: { username: true, balance: true }
});
```

### 3. Use Denormalization Wisely
The `Trade` model already includes a `total` field (`quantity * price`). This is a denormalization strategy to avoid calculating this value on every read, saving CPU cycles at the cost of minimal storage.

### 4. Database Scaling
Since QuantSim uses **PostgreSQL 14**, it can handle hundreds of thousands of rows easily. Beyond that, consider:
- **Connection Pooling:** Use `PgBouncer` to manage many concurrent backend connections.
- **Read Replicas:** If read traffic (market data dashboard) outweighs write traffic (trades).
