# Unified API Contracts (Shared Context)

This document provides a consolidated view of all API endpoints for AI agents.

## Base URL
- **Local**: `http://localhost:3000`
- **Prefixes**: `/user`, `/assets`, `/market`, `/portfolio`, `/trades`, `/internal`

---

## 1. Asset API (`/assets`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/` | List all assets (paginated) | No |

## 2. Market API (`/market`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/:symbol/history`| OHLCV history | No |
| GET | `/ticker` | Latest prices (Redis) | No |

## 6. Internal Service API (`/internal`)
*Dedicated endpoints for the Raspberry Pi Market Data Ingestor.*

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/sync-assets` | Register/Update assets from Ingestor | Shared Secret |
| POST | `/heartbeat` | Health check from Ingestor | No |

---

## Redis Channels (Real-time Stream)
The Ingestor publishes to these channels, and the Main Backend (or WebSockets) subscribes.

| Channel | Format | Description |
| :--- | :--- | :--- |
| `price_updates` | `{ "symbol": "BTC", "price": "64500.25", "ts": 123... }` | Live price feed |
| `market_status` | `{ "status": "OPEN", "exchange": "NASDAQ" }` | Market state changes |

---

## Technical Standards
- **Errors**: Standard format `{ "success": false, "message": "string" }`.
- **Decimals**: Financial values are strings in JSON to preserve precision.
- **Authentication**: 
    - Client: JWT in `Authorization` header.
    - Internal: Shared API Key in `X-Internal-Secret` header.
