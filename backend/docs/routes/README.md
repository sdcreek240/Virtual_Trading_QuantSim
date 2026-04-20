# QuantSim API Documentation

## Index

### 🔐 Authentication (`/auth`)
- [Auth API Contracts](./auth.md)
  - `POST /auth/register`: Create a new user account.
  - `POST /auth/login`: Authenticate and receive JWT tokens.
  - `GET /auth/protected`: Test JWT authentication status.

### 📈 Market Data (`/market`)
- [Market API Contracts](./market.md) (Draft)
  - `GET /assets`: List tradeable assets.
  - `GET /assets/:symbol/history`: Retrieve price history.

### 💼 Portfolio Management (`/portfolio`)
- [Portfolio API Contracts](./portfolio.md) (Draft)
  - `GET /portfolio`: View current holdings and performance.
  - `GET /watchlist`: List followed assets.

### 💸 Trading (`/trades`)
- [Trading API Contracts](./trades.md) (Draft)
  - `POST /trades`: Execute buy/sell orders.
  - `GET /trades`: View personal trade history.

## General Information

### Base URL
`http://localhost:3000` (Development)

### Response Format
Most endpoints return a standard JSON response:
```json
{
  "success": true,
  "data": { ... }
}
```
Or in case of errors:
```json
{
  "success": false,
  "error": "Human readable error message",
  "details": [ ... ]
}
```

### Authentication
Secure routes require a Bearer Token in the `Authorization` header:
`Authorization: Bearer YOUR_ACCESS_TOKEN`
