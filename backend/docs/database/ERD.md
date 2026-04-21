# Entity Relationship Diagram (ERD)

The following diagram illustrates the relationships between the core entities in the QuantSim database.

```mermaid
erDiagram
    USER ||--o{ TRADE : "executes"
    USER ||--o{ PORTFOLIO : "owns"
    ASSET ||--o| MARKETDATA : "has latest"
    
    USER {
        string id PK
        string email UK
        string username UK
        string passwordHash
        float balance
        datetime createdAt
        datetime updatedAt
    }

    ASSET {
        string id PK
        string symbol UK
        string name
        AssetType type
        string exchange
    }

    PORTFOLIO {
        string id PK
        string userId FK
        string symbol
        float quantity
        float avgPrice
    }

    TRADE {
        string id PK
        string userId FK
        string symbol
        TradeSide side
        float quantity
        float price
        float total
        TradeStatus status
        datetime createdAt
    }

    MARKETDATA {
        string id PK
        string symbol UK, FK
        float price
        float volume
        float high24h
        float low24h
        float changePercent
        datetime updatedAt
    }
```

## Relationship Details

- **User and Trade (1:N):** One user can execute many trades. A trade always belongs to exactly one user.
- **User and Portfolio (1:N):** One user can own multiple portfolio entries (one per unique asset).
- **Asset and MarketData (1:1):** Each asset has exactly one corresponding market data snapshot, linked by the `symbol` field.
- **Portfolio/Trade and Asset:** Although not strictly enforced by a foreign key in the Prisma schema (which uses the `symbol` string), these models relate to the `Asset` registry conceptually.
