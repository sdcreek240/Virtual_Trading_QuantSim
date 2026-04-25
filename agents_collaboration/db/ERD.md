# Comprehensive ERD (Mermaid)

This diagram represents the full database schema as of April 2026.

```mermaid
erDiagram
    USER ||--o{ PORTFOLIO : "owns"
    USER ||--o{ TRADE : "executes"
    USER ||--o{ WATCHLIST : "tracks"
    
    ASSET ||--o| MARKETDATA : "has latest"
    ASSET ||--o{ PORTFOLIO : "contained in"
    ASSET ||--o{ TRADE : "traded in"
    ASSET ||--o{ WATCHLIST : "on list"
    ASSET ||--o{ PRICEHISTORY : "has history"

    USER {
        string id PK
        string email UK
        string username UK
        string passwordHash
        decimal balance
        UserRole role
        datetime lastLoginAt
        datetime createdAt
        datetime updatedAt
    }

    ASSET {
        string id PK
        string symbol UK
        string name
        AssetType type
        string exchange
        string sector
        string industry
        string description
        string logoUrl
    }

    PORTFOLIO {
        string id PK
        string userId FK
        string symbol FK
        decimal quantity
        decimal avgPrice
    }

    TRADE {
        string id PK
        string userId FK
        string symbol FK
        TradeSide side
        decimal quantity
        decimal price
        decimal total
        TradeStatus status
        datetime createdAt
    }

    MARKETDATA {
        string id PK
        string symbol UK, FK
        decimal price
        decimal volume
        decimal high24h
        decimal low24h
        decimal changePercent
        datetime updatedAt
    }

    PRICEHISTORY {
        string id PK
        string symbol FK
        decimal open
        decimal high
        decimal low
        decimal close
        decimal volume
        datetime timestamp
        string interval
    }

    WATCHLIST {
        string id PK
        string userId FK
        string symbol FK
        datetime createdAt
    }
```

## Data Types Note
- **Decimal**: Used for all financial values (Price, Balance, Quantity, Total). Precision is set to handle high-precision assets like Crypto (up to 8 decimal places for quantity).
- **CUID**: Used for all IDs.
- **Enums**: 
    - `AssetType`: STOCK, CRYPTO, ETF
    - `TradeSide`: BUY, SELL
    - `TradeStatus`: PENDING, EXECUTED, CANCELLED
    - `UserRole`: USER, ADMIN
