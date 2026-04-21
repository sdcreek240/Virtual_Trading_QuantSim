# Portfolio API Contract

## GET `/portfolio`
Returns the authenticated user's current holdings and overall performance.

**Auth Required:** Yes

**Response (200):**
```json
{
  "totalValue": "105432.20",
  "cashBalance": "74320.50",
  "totalPnL": "5432.20",
  "totalPnLPercent": "5.43",
  "holdings": [
    {
      "symbol": "AAPL",
      "quantity": "25.00000000",
      "avgPrice": "196.90",
      "currentPrice": "213.45",
      "marketValue": "5336.25",
      "pnl": "413.75",
      "pnlPercent": "8.41"
    }
  ]
}
```

## GET `/watchlist`
Returns assets the user is currently tracking.

**Auth Required:** Yes

**Response (200):**
```json
[
  {
    "symbol": "TSLA",
    "name": "Tesla Inc.",
    "currentPrice": "248.90",
    "changePercent": "-2.31"
  }
]
```
