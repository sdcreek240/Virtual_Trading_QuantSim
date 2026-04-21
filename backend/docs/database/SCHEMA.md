# Database Schema Reference (Optimized)

## Enums

### `AssetType`
Defines the category of a tradeable asset.
- `STOCK`, `CRYPTO`, `ETF`

### `TradeSide`
The direction of a trade.
- `BUY`, `SELL`

### `TradeStatus`
The lifecycle stage of a trade.
- `PENDING`, `EXECUTED`, `CANCELLED`

### `UserRole`
Access levels for the platform.
- `USER`, `ADMIN`

---

## Models

### `User`
| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `id` | `String` | Unique identifier (CUID) | `@id` |
| `balance` | `Decimal` | Virtual cash balance | `Decimal(20, 2)`, `@default(100k)` |
| `role` | `UserRole`| Access level | `@default(USER)` |
| `lastLoginAt` | `DateTime?`| Last activity timestamp | |

### `Asset`
| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `symbol` | `String` | Ticker symbol (e.g., AAPL) | `@unique` |
| `sector` | `String?` | e.g., "Technology" | |
| `industry` | `String?` | e.g., "Semiconductors" | |
| `description`| `String?` | Full text bio of the asset | `@db.Text` |

### `Portfolio`
| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `quantity` | `Decimal` | Total units held | `Decimal(24, 8)` |
| `avgPrice` | `Decimal` | Weighted average buy price | `Decimal(20, 4)` |

### `Trade`
| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `quantity` | `Decimal` | Number of units traded | `Decimal(24, 8)` |
| `price` | `Decimal` | Execution price | `Decimal(20, 4)` |
| `total` | `Decimal` | `quantity * price` | `Decimal(20, 2)` |

### `MarketData`
| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `price` | `Decimal` | Current market price | `Decimal(20, 4)` |
| `changePercent`| `Decimal?` | 24h price change % | `Decimal(8, 2)` |

### `PriceHistory` (New)
Stores OHLCV (Open, High, Low, Close, Volume) data points for charting.
| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `open/high/low/close` | `Decimal` | Price points for the interval | `Decimal(20, 4)` |
| `timestamp` | `DateTime` | Start time of the interval | |
| `interval` | `String` | e.g., "1d", "1h" | `@default("1d")` |

### `Watchlist` (New)
Tracks assets users are interested in.
| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `userId` | `String` | Reference to `User` | |
| `symbol` | `String` | Reference to `Asset` | |

---

## Core Relationships (Enhanced)
1. **Asset → Portfolio/Trade (1:M):** All holdings and trades are strictly linked to the `Asset` registry via `symbol`.
2. **Asset → PriceHistory (1:M):** One asset has many historical data points.
3. **User → Watchlist (1:M):** Users can follow multiple assets.
