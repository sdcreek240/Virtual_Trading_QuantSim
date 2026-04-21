# QuantSim API Documentation

## Route Index

### 🔐 User & Authentication (`/user`)
Status: ✅ **Production Ready**
- [User Auth Contracts](./auth.md)
  - `POST /user/register`: Create a new user account.
  - `POST /user/login`: Authenticate and receive JWT tokens.
  - `GET /user/protected`: (Protected) Verify authentication status.

### 📈 Market Data (`/market`)
Status: 🛠️ **In Development**
- [Market API Contracts](./market.md)
  - `GET /market/assets`: Search and filter tradeable assets.
  - `GET /market/assets/:symbol`: Detailed asset information.
  - `GET /market/assets/:symbol/history`: Historical OHLCV data.
  - `WS /market/prices`: Real-time price stream (WebSocket).

### 💼 Portfolio Management (`/portfolio`)
Status: 📋 **Draft / Planned**
- [Portfolio API Contracts](./portfolio.md)
  - `GET /portfolio`: Overview of current holdings and performance.
  - `GET /portfolio/performance`: Historical returns and metrics.
  - `GET /watchlist`: List followed assets.

### 💸 Trading (`/trades`)
Status: 📋 **Draft / Planned**
- [Trading API Contracts](./trades.md)
  - `POST /trades/buy`: Execute a buy order.
  - `POST /trades/sell`: Execute a sell order.
  - `GET /trades/history`: List personal trade history.

---

## Technical Context

### Base URL
`http://localhost:3000` (Local)

### Security Strategy
Authentication is strictly stateless via **JWT (JSON Web Tokens)**.
- **Access Tokens**: Short-lived (15 min) for API authorization.
- **Refresh Tokens**: Long-lived (7 days) to maintain user sessions.
- **Authorization**: All protected routes require `Authorization: Bearer <token>`.

### Common Response Model
All endpoints adhere to a standardized response envelope:
```json
{
  "success": true, // Boolean status
  "message": "Human readable summary", // Optional
  "data": { ... }, // Payload for 2xx responses
  "error": "Short error code", // Payload for 4xx/5xx responses
  "details": [ ... ] // Granular validation errors (e.g., Zod errors)
}
```
