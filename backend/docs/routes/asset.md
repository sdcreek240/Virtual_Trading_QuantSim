# Asset API Contract

## GET `/assets`
Returns a paginated list of tradeable assets.

**Query Params:**
- `search` (optional): Filter by name or symbol.
- `type` (optional): `STOCK`, `CRYPTO`, or `ETF`.
- `page` (optional, default: 0): Page number.
- `limit` (optional, default: 10): Number of items per page.

**Success Response (200):**
```json
{
  "success": true,
  "assets": [
    {
      "id": "cl...",
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "type": "STOCK",
      "exchange": "NASDAQ",
      "sector": "Technology",
      "industry": "Consumer Electronics",
      "description": "...",
      "logoUrl": "..."
    }
  ],
  "pagination": {
    "page": 0,
    "limit": 10,
    "total": 150
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```
