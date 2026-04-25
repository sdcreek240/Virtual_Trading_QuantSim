# Data Dictionary (Shared Agent Context)

This file provides a simplified overview of the QuantSim database for AI agents.

## Core Mandates
- **Financial Precision**: ALWAYS use `Decimal` for currency, balance, and quantity.
- **Primary Key Strategy**: Most tables use `cuid()` strings as `id`.
- **Join Key**: `symbol` is the primary link for all asset-related data.

## Tables Summary

| Table | Purpose | Key Fields |
| :--- | :--- | :--- |
| **User** | Account info & balance | `id`, `email`, `balance` (Decimal 20,2) |
| **Asset** | Master registry of symbols | `symbol` (Unique), `name`, `type` (Enum) |
| **Portfolio**| Current user holdings | `userId`, `symbol`, `quantity` (Decimal 24,8) |
| **Trade** | Ledger of all transactions | `userId`, `symbol`, `side` (BUY/SELL), `price` |
| **MarketData**| Latest price snapshot | `symbol` (Unique), `price` (Decimal 20,4) |
| **PriceHistory**| OHLCV historical data | `symbol`, `timestamp`, `interval` |
| **Watchlist** | User tracking list | `userId`, `symbol` |

## Enums
- `AssetType`: STOCK, CRYPTO, ETF
- `TradeSide`: BUY, SELL
- `TradeStatus`: PENDING, EXECUTED, CANCELLED
- `UserRole`: USER, ADMIN

## Critical Relationships
- **User (1:N) -> Trade/Portfolio/Watchlist**: Linked via `userId`.
- **Asset (1:N) -> Trade/Portfolio/Watchlist/MarketData**: Linked via `symbol`.
- **Asset (1:1) -> MarketData**: Latest price state.
