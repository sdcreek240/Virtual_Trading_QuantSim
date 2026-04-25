# Plan: Market Data Ingestor Service (TiffEx)

## Objective
Build a standalone `ingestor` service that serves as the "Proprietary Data Feed" for TiffEx.

## Architecture & Tech Stack
- **Folder**: `/ingestor`
- **Language**: TypeScript / Node.js
- **Streaming**: Redis Pub/Sub (Primary price feed)
- **Sync**: HTTP REST to Main Backend (Internal Registry Sync)
- **Containerization**: Docker (via `docker-compose`)

## Data Source Recommendations
| Source | Type | Pro | Con |
| :--- | :--- | :--- | :--- |
| **Binance API** | Crypto | Real-time, Free WS | Crypto Only |
| **Yahoo Finance**| Stocks/ETFs | Vast Coverage | Unofficial API |
| **Alpaca** | Stocks | High Accuracy | Requires "Paper" Key |
| **Finnhub** | Profile/Meta | Reliable Symbols | 1min Delay for free |

## Implementation Strategy

### 1. Repository Structure
```text
/ingestor
  ├── src/
  │   ├── index.ts        # Entry point
  │   ├── providers/      # Binance.ts, Yahoo.ts, etc.
  │   ├── services/       # RedisStream, RegistrySync
  │   └── types/          # Normalized TiffEx data types
  ├── package.json
  └── tsconfig.json
```

### 2. Multi-Service Workflow
- `npm run ingestor` (from root) will execute `docker compose up ingestor`.
- Ingestor will read its own `.env`.
- It will normalization prices: `Raw API -> { symbol, price, timestamp } -> Redis`.

### 3. Shared Brain Updates
- Any new asset "discovered" by the Ingestor must be POSTed to the Main Backend `/internal/sync-assets`.
