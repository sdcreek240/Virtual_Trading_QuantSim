# Market API Contract

## GET `/assets`
Returns a list of all tradeable assets.

**Query Params:**
- `search` (optional): Filter by name or symbol
- `type` (optional): `STOCK`, `CRYPTO`, or `ETF`

**Response (200):**
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "type": "STOCK",
    "exchange": "NASDAQ"
  }
]
```

## GET `/assets/:symbol/history`
Returns historical OHLCV data for an asset.

**Query Params:**
- `interval` (default `1d`): `1m`, `1h`, `1d`
- `limit` (default 30): Number of bars to return

**Response (200):**
```json
[
  {
    "timestamp": "2026-04-18T00:00:00Z",
    "open": "210.45",
    "high": "215.80",
    "low": "209.20",
    "close": "213.45",
    "volume": "58200000"
  }
]
```
