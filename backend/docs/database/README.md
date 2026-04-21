# QuantSim Database Documentation

## Overview
The QuantSim database is designed to support a real-time trading simulation platform. It manages user accounts, tracks virtual cash balances, maintains a registry of tradeable assets (Stocks, Crypto, ETFs), records immutable trade history, and stores live market snapshots.

### Table Purposes
| Table | Description |
| :--- | :--- |
| **User** | Stores user credentials, hashed passwords, and current virtual cash balance. |
| **Asset** | A global registry of symbols (AAPL, BTC-USD) used to validate trades and market updates. |
| **Portfolio** | Represents a user's current holdings (quantity and average cost basis) for a specific asset. |
| **Trade** | An immutable audit log of every BUY or SELL execution. |
| **MarketData** | Stores the latest price, volume, and 24h stats for each asset in the registry. |

## Technology Stack
- **Database Engine:** PostgreSQL 14
- **ORM:** Prisma v6.6.0
- **Node Runtime:** TypeScript + `tsx` (for seeding)

## Environment Variables
Ensure the following variable is defined in your `.env` file:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quantsim"
```

## Quick Start Commands

### 1. Initialize Database
Apply existing migrations to a fresh database instance:
```bash
npx prisma migrate deploy
```

### 2. Create a New Migration
Generate a new migration after making changes to `schema.prisma`:
```bash
npx prisma migrate dev --name <migration_name>
```

### 3. Seed Data
Populate the database with test users, assets, and initial market snapshots:
```bash
npx tsx prisma/seed.ts
```

### 4. Database Explorer
Launch the Prisma Studio GUI to inspect or edit data:
```bash
npx prisma studio
```
