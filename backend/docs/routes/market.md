# Market API Contract

## GET `/market/:symbol/history`
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

## GET `/market/ticker`
Returns the latest price snapshots for all active assets (from Redis cache).

**Response (200):**
```json
{
  "AAPL": { "price": "213.45", "change": "+1.2%" },
  "BTC": { "price": "64500.00", "change": "-2.5%" }
}
```
