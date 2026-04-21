# Trading API Contract

## POST `/trades`
Executes a new trade (BUY/SELL).

**Auth Required:** Yes

**Request Body:**
```json
{
  "symbol": "AAPL",
  "side": "BUY",
  "quantity": 10
}
```

**Response (201):**
```json
{
  "trade": {
    "id": "cuid",
    "symbol": "AAPL",
    "side": "BUY",
    "quantity": "10.00000000",
    "price": "213.45",
    "total": "2134.50",
    "createdAt": "iso_timestamp"
  },
  "newBalance": "97865.50"
}
```

## GET `/trades`
Returns a list of trades for the authenticated user.

**Auth Required:** Yes

**Query Params:**
- `symbol` (optional): Filter by asset
- `limit` (default 50): Pagination limit

**Response (200):**
```json
[
  {
    "id": "cuid",
    "symbol": "AAPL",
    "side": "BUY",
    "quantity": "10.0",
    "price": "213.45",
    "total": "2134.5",
    "createdAt": "..."
  }
]
```
