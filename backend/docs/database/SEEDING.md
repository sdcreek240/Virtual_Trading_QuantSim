# Seeding Documentation

The database can be populated with initial data using the `prisma/seed.ts` script. This is essential for local development to ensure a consistent environment for testing.

## Seed Content Overview

### 1. Assets (13 items)
A registry of 13 tradeable symbols across three categories:
- **Stocks:** AAPL, MSFT, GOOGL, AMZN, TSLA, NVDA, JPM, XOM
- **Crypto:** BTC-USD, ETH-USD, SOL-USD
- **ETFs:** SPY, QQQ

### 2. Market Snapshots (13 items)
Initial price, 24h volume, 24h high/low, and 24h change % for every asset in the registry.

### 3. Test Users (3 items)
| Username | Email | Initial Balance | Description |
| :--- | :--- | :--- | :--- |
| `aidan` | `aidan@quantsim.dev` | $74,320.50 | Mixed portfolio with partial sells. |
| `alice_trades`| `alice@quantsim.dev` | $100,000.00 | Fresh account with no trades. |
| `bob_the_bull` | `bob@quantsim.dev` | $12,450.75 | Heavy trader with multiple positions. |

*Default password for all seed users is `password123`.*

---

## Technical Implementation Details

### Password Hashing
During the seed process, passwords are hashed using **SHA-256**. While suitable for local simulation, a more secure algorithm like Argon2 or bcrypt should be used for production environments.

```typescript
function hashPassword(plain: string): string {
  return createHash("sha256").update(plain).digest("hex");
}
```

### Portfolio Derivation Logic
The seed script does not just insert static portfolio values. Instead, it **derives** the current portfolio from a mock trade history for each user.

- **Quantity:** Sum of BUY quantities minus sum of SELL quantities.
- **Average Price (Cost Basis):** Calculated as a weighted average during BUY operations. SELL operations reduce the quantity and total cost proportionally based on the current average price.

### Seed Command
Run the seed script manually using `tsx`:
```bash
npx tsx prisma/seed.ts
```
*Note: The `prisma migrate dev` and `prisma migrate reset` commands also trigger this script automatically.*
