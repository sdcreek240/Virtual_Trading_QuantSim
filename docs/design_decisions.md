# QuantSim — Design Decisions & Research

> Technical rationale, trade-offs, and alternatives for system architecture decisions

---

## Table of Contents

1. [Backend Framework Selection](#backend-framework-selection)
2. [Real-Time Communication](#real-time-communication)
3. [Database Strategy](#database-strategy)
4. [Trade Execution Architecture](#trade-execution-architecture)
5. [Frontend Technology Stack](#frontend-technology-stack)
6. [Caching & Performance](#caching--performance)
7. [Scalability Roadmap](#scalability-roadmap)
8. [Deployment Strategy](#deployment-strategy)

---

## Backend Framework Selection

### Decision: Fastify + Node.js

#### Why Fastify?

| Criterion | Fastify | Express | Hapi | NestJS |
|-----------|---------|---------|------|--------|
| **Speed** | ✅ Fastest JSON parsing | ⚠️ Slower | ⚠️ Slower | ✅ Fast (built on Express) |
| **Boilerplate** | ✅ Minimal | ✅ Minimal | ❌ Verbose | ❌ Verbose (opinionated) |
| **WebSocket** | ✅ Native support | ⚠️ Manual setup | ⚠️ Manual setup | ✅ Built-in |
| **Learning Curve** | ✅ Shallow | ✅ Shallow | ❌ Steep | ❌ Steep |
| **TypeScript** | ✅ First-class | ⚠️ Good | ✅ Good | ✅ Built-in |
| **Production Ready** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

**Trade-offs:**
- ✅ Fastify is **lightweight** and **blazing fast** — ideal for real-time trading
- ❌ Smaller ecosystem than Express (but sufficient for this project)
- ✅ Native WebSocket integration aligns with Phase 2 requirements

**Alternatives Considered:**
- **Express:** Mature, large ecosystem, but slower JSON parsing (not ideal for high-frequency data)
- **Go (Gin):** Better performance, but team expertise is Node.js
- **Rust (Axum):** Optimal performance, but steep learning curve and slower development
- **NestJS:** Opinionated, more boilerplate, overkill for prototype phase

**Decision:** ✅ **Fastify** — best balance of speed, simplicity, and WebSocket support

---

## Real-Time Communication

### Decision: WebSockets (ws library)

#### Why WebSockets?

| Transport | Latency | Bandwidth | Complexity | Use Case |
|-----------|---------|-----------|-----------|----------|
| **WebSocket** | ✅ 5-50ms | ✅ Low | ✅ Moderate | Real-time trading |
| **HTTP Long-Polling** | ❌ 500-2000ms | ❌ High | ✅ Simple | Fallback option |
| **Server-Sent Events (SSE)** | ⚠️ 100-500ms | ⚠️ Medium | ✅ Simple | One-way real-time |
| **gRPC Streaming** | ✅ 5-50ms | ⚠️ Medium | ❌ Complex | Microservices only |

**Why NOT HTTP-only?**
- Price updates must be **pushed to clients** in real-time
- 500-2000ms latency from polling is **unacceptable** for trading
- WebSocket provides **persistent, low-latency connection**

**Trade-offs:**
- ✅ WebSockets are **industry standard** for trading platforms
- ❌ Requires stateful server (affects horizontal scaling later)
- ✅ Browser support is **universal** (98%+)

**Architecture:**
```
Client WebSocket Connection
  ├── Subscribe to price channels (e.g., "AAPL", "TSLA")
  ├── Receive real-time price updates
  ├── Receive trade confirmations
  └── Receive portfolio updates
```

**Scalability Note:** WebSocket state management can be offloaded to Redis Pub/Sub with multiple backend instances (see Phase 8 scaling plan).

**Decision:** ✅ **WebSocket (ws)** — essential for real-time trading experience

---

## Database Strategy

### Decision: PostgreSQL + Redis

#### Why PostgreSQL?

| Criterion | PostgreSQL | MongoDB | MySQL | CockroachDB |
|-----------|-----------|---------|-------|------------|
| **ACID** | ✅ Strong | ⚠️ Eventual | ✅ Strong | ✅ Strong |
| **Data Integrity** | ✅ Excellent | ⚠️ Flexible | ✅ Good | ✅ Excellent |
| **Complex Queries** | ✅ Powerful | ⚠️ Limited | ✅ Good | ✅ Good |
| **Scaling** | ⚠️ Vertical | ✅ Horizontal | ⚠️ Vertical | ✅ Horizontal |
| **Maturity** | ✅ Battle-tested | ⚠️ Younger | ✅ Mature | ⚠️ Newer |

**Why NOT MongoDB?**
- Trading data **requires ACID compliance** (can't lose trades due to network partition)
- Trades are **relational** (user → portfolio → holdings → transactions)
- Flexible schema is **not an advantage** for structured trading data

**Why NOT MySQL?**
- PostgreSQL is **strictly more powerful** (JSON support, window functions, CTEs)
- PostgreSQL has **better concurrency** handling

**Trade-offs:**
- ✅ PostgreSQL is **bulletproof** for financial data
- ❌ Horizontal scaling requires replication setup (future problem)
- ✅ JSON support in PostgreSQL allows flexible nested data

**Decision:** ✅ **PostgreSQL** — only acceptable choice for trading data

---

### Decision: Redis for Caching & Pub/Sub

#### Use Cases:

| Use Case | Why Redis | Alternative |
|----------|-----------|------------|
| **Price Cache** | ✅ Sub-millisecond access | Database query (slower) |
| **Session Storage** | ✅ Fast, ephemeral | Database (slower) |
| **WebSocket Pub/Sub** | ✅ Native support | Message queue (overkill now) |
| **Rate Limiting** | ✅ Atomic counters | Application logic (buggy) |
| **Leaderboard (future)** | ✅ Sorted sets | Database sort (slow) |

**Architecture:**
```
Market Data API
  ↓ (every 100ms)
Redis Cache (latest prices)
  ↓ (Redis Pub/Sub)
WebSocket Broadcast → All Connected Clients

Database (PostgreSQL)
  ↓ (async, periodic)
Persist trades, analytics
```

**Trade-offs:**
- ✅ Redis is **extremely fast** for real-time data
- ❌ In-memory means data loss on crash (acceptable for cache)
- ✅ Redis Pub/Sub enables **scaling to multiple backend instances**

**Decision:** ✅ **Redis** — essential for real-time performance

---

## Trade Execution Architecture

### Decision: In-Memory Engine (Phase 4)

#### Why In-Memory First?

| Approach | Latency | Accuracy | Scalability | Complexity |
|----------|---------|----------|------------|-----------|
| **In-Memory** | ✅ <1ms | ✅ Perfect | ❌ Single instance | ✅ Simple |
| **Database-Backed** | ⚠️ 10-50ms | ✅ Perfect | ⚠️ Limited | ⚠️ Complex |
| **Message Queue** | ⚠️ 5-20ms | ✅ Perfect | ✅ Scalable | ❌ Very complex |

**Why NOT database-backed immediately?**
- Database writes are **10-50x slower** than in-memory (10-50ms vs <1ms)
- For prototype, **accuracy is OK**, we're simulating trades anyway
- Can be upgraded later without architectural change

**Trade-offs:**
- ✅ Trades execute **instantly**
- ❌ Trades **lost if server restarts** (acceptable for prototype)
- ❌ Can't scale horizontally (Phase 8 fixes this)

**Future Evolution:**
```
Phase 4 (Current)     → In-memory only
Phase 8 (Future)      → In-memory + async persistence to DB
Phase 9 (Mature)      → Distributed trade engine (C++ microservice)
```

**Decision:** ✅ **In-Memory** — acceptable for prototype, clear upgrade path

---

### Decision: Immediate Order Filling

#### Why Not Build Full Order Book?

| Component | In Prototype | Added Value | Effort |
|-----------|-------------|------------|--------|
| **Simple fill** | ✅ Yes | ✅ Works end-to-end | 1 day |
| **Order book** | ❌ No | ⚠️ Would need market participants | 3-5 days |
| **Matching engine** | ❌ No | ⚠️ Complex logic, no benefit yet | 5-10 days |
| **Market impact** | ❌ No | ⚠️ Advanced feature | 2-3 days |

**Why Immediate Filling?**
- Only **user** is trading (no real counterparties)
- Orders should **fill at current market price** (realistic simulation)
- **Avoids building idle infrastructure** for prototype

**Future Enhancement:**
```
Phase 6 (Prototype):   User place trade → immediately fills
Phase 9+ (Mature):     Add order book, partial fills, market impact
```

**Decision:** ✅ **Immediate Filling** — pragmatic for prototype

---

## Frontend Technology Stack

### Decision: React + TypeScript

#### Why React?

| Criterion | React | Vue | Svelte | Angular |
|-----------|-------|-----|--------|---------|
| **Ecosystem** | ✅ Largest | ✅ Good | ⚠️ Smaller | ⚠️ Opinionated |
| **Learning Curve** | ⚠️ Moderate | ✅ Shallow | ✅ Very shallow | ❌ Steep |
| **Performance** | ✅ Good | ✅ Good | ✅ Best | ✅ Good |
| **TypeScript** | ✅ Excellent | ✅ Good | ⚠️ Newer | ✅ Built-in |
| **Community** | ✅ Massive | ✅ Large | ⚠️ Growing | ✅ Large |

**Trade-offs:**
- ✅ React has **largest community** and **best TypeScript support**
- ✅ **Reusable components** for charts, forms, tables
- ❌ Slightly larger bundle size (mitigated by Vite tree-shaking)

**Decision:** ✅ **React + TypeScript** — right tool for interactive dashboard

---

### Decision: Tailwind CSS + Recharts

#### Why Tailwind?

- ✅ **Utility-first** is perfect for rapid prototyping
- ✅ **No context switching** between JS and CSS files
- ✅ **Built-in responsive** breakpoints
- ⚠️ Slightly larger HTML (mitigated by minification)

#### Why Recharts?

- ✅ **React-native** (not just Canvas wrapper like D3)
- ✅ **Responsive by default**
- ✅ **Good for real-time updates** (no D3 data binding overhead)
- ⚠️ Less customizable than D3 (acceptable for trading charts)

**Alternative:** Lightweight Charts (TradingView's library)
- ✅ Industry-standard for trading platforms
- ✅ Extreme performance (WebGL rendering)
- ❌ Not React-native (extra integration work)

**Future Upgrade:** Can replace Recharts with Lightweight Charts in Phase 9 if performance becomes critical.

**Decision:** ✅ **Tailwind + Recharts** — good balance for prototype

---

## Caching & Performance

### Price Caching Strategy

```
Market Data API (every 100ms)
  ↓ (fetch latest prices)
Redis Cache → TTL: 100ms
  ↓
WebSocket Broadcast → All Clients
  ↓
Browser → Update charts
```

**Why Cache?**
- ✅ If market API goes down, **prices stale but available**
- ✅ Multiple WebSocket clients **read same cached price** (no duplicate API calls)
- ✅ **Sub-millisecond latency** for WebSocket broadcasts

**Cache Invalidation:**
- **TTL (Time To Live):** 100ms (if no new data, auto-clear)
- **Event-based:** New price update → immediately broadcast
- **Manual:** On server restart → clear cache

**Decision:** ✅ **Short TTL Cache** — balances freshness and performance

---

### Database Query Optimization

#### What to Index?

```sql
-- Frequently filtered
CREATE INDEX ON trades(user_id, created_at DESC);
CREATE INDEX ON portfolio_holdings(user_id);
CREATE INDEX ON prices(symbol, created_at DESC);

-- Analytics queries (later)
CREATE INDEX ON trades(created_at DESC);
CREATE INDEX ON trades(status, created_at DESC);
```

**Why These Indexes?**
- ✅ Most queries filter by `user_id` (personal portfolio)
- ✅ Time-series data accessed `DESC` (most recent first)
- ⚠️ Don't over-index (write performance degrades)

**Decision:** ✅ **Strategic Indexing** — enables sub-100ms queries

---

## Scalability Roadmap

### Current Architecture (Single Instance)

```
Client 1 ─┐
Client 2 ─├─→ Node.js (Fastify + WS) ─→ PostgreSQL
Client 3 ─┤                          ├→ Redis
         └─→                         └
```

**Limitations:**
- ❌ Only **1 server instance**
- ❌ WebSocket **connections tied to server instance**
- ❌ **Can't restart server** without disconnecting all clients
- ❌ Can handle ~10k concurrent connections (typical hardware)

### Phase 8 Architecture (Horizontal Scaling)

```
Load Balancer (sticky sessions)
  ├─→ Node 1 (Fastify) ─┐
  ├─→ Node 2 (Fastify) ──┼─→ PostgreSQL
  └─→ Node 3 (Fastify) ──┘    Redis
                                ├→ Pub/Sub (broadcast)
                                └→ Cache
```

**Upgrade Strategy:**
1. Add **Redis Pub/Sub** for server-to-server communication
2. Add **load balancer** (sticky sessions for WebSocket)
3. Deploy **multiple backend instances**
4. Bottleneck becomes PostgreSQL (see Phase 9)

**Decision:** ✅ **Defer horizontal scaling** — single instance sufficient for prototype

---

### Phase 9 Architecture (Performance Bottleneck)

When database becomes bottleneck:

```
High-Frequency Trade Engine (C++)
  ├→ Ultra-fast order execution (<100µs)
  ├→ Dedicated memory for order book
  └→ TCP connection to Node.js

Node.js (API Gateway)
  ├→ WebSocket → C++ engine
  └→ REST → C++ engine

PostgreSQL
  └→ Async write of trade results (journaling)
```

**Why C++?**
- ✅ 100-1000x faster than JavaScript for order matching
- ✅ Deterministic latency (<100 microseconds)
- ✅ Can handle **100k+ trades/sec** vs 10k/sec in Node

**Cost of this upgrade:**
- ❌ Need C++ expertise
- ❌ Cross-language debugging is harder
- ✅ But only needed if system grows 10x+

**Decision:** ✅ **Plan for it, don't build it now**

---

## Deployment Strategy

### Development (Phase 3)

```bash
docker-compose up --build
```

**Services:**
- Backend: `localhost:3000`
- Frontend: `localhost:5173`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

**Advantages:**
- ✅ Environment matches production
- ✅ All services run together
- ✅ Easy onboarding (one command)

---

### Production (Future — Phase 8+)

#### Option 1: Render + Railway (Simple)

```
Frontend (Static)          Backend (Docker)        Database (Managed)
├→ Render (Static Site)    ├→ Render (Web Service) ├→ Render (PostgreSQL)
└→ CDN                     └→ Health checks        └→ Automated backups
```

**Pros:** ✅ Zero infrastructure management
**Cons:** ❌ Less control, potential cold starts

#### Option 2: Kubernetes (Scalable)

```
Ingress (Load Balancer)
  ├→ Pod 1 (Backend) ─┐
  ├→ Pod 2 (Backend) ──┼→ Persistent Storage (PostgreSQL)
  └→ Pod 3 (Backend) ──┘   Redis Cache
  ├→ Pod 1 (Frontend)
  └→ Pod 2 (Frontend)
```

**Pros:** ✅ Infinite scalability, industry standard
**Cons:** ❌ Operational complexity, cost at scale

---

## Database Schema Design

### Entities

```
User
├── id (PK)
├── username (UNIQUE)
├── email (UNIQUE)
└── created_at

PortfolioHolding
├── id (PK)
├── user_id (FK → User)
├── symbol (e.g., "AAPL")
├── quantity
├── average_cost
└── created_at

Trade
├── id (PK)
├── user_id (FK → User)
├── symbol
├── side (BUY/SELL)
├── quantity
├── price
├── status (PENDING/FILLED/CANCELLED)
├── created_at

Price
├── id (PK)
├── symbol
├── close (latest price)
├── timestamp
├── source (API provider)
```

### Rationale

- ✅ **Normalized schema** prevents data anomalies
- ✅ **Foreign keys** ensure referential integrity
- ✅ **Timestamps** enable audit trails
- ✅ **Separation of concerns** (trades, holdings, prices independent)

**Trade-offs:**
- ❌ Normalized schema requires joins (acceptable at this scale)
- ✅ Can denormalize specific views later if needed (materialized views)

**Decision:** ✅ **Normalized relational schema** — best for financial data

---

## Security Considerations (Future Phases)

### Authentication (Phase 8)

```
Client → POST /auth/login → Backend
         ↓ (validate credentials)
         ← JWT token
         → (include in all requests)
         ← Verify JWT, get user_id
```

**Why JWT?**
- ✅ Stateless (no session storage needed)
- ✅ Scales to multiple servers
- ✅ Standard for REST APIs

---

### Data Validation (Every Phase)

```typescript
// Example: Trade request validation
const TradeSchema = z.object({
  symbol: z.string().length(3, 4),
  side: z.enum(['BUY', 'SELL']),
  quantity: z.number().positive(),
  price: z.number().positive(),
});
```

**Why Zod/Joi?**
- ✅ Runtime validation (TypeScript types don't run)
- ✅ Clear error messages
- ✅ Prevents injection attacks

---

## Summary: Decision Matrix

| Decision | Choice | Rationale | Revisit When |
|----------|--------|-----------|-------------|
| Backend | Fastify | Speed + simplicity | Single instance can't handle load |
| Real-time | WebSocket | <50ms latency required | Need >10k concurrent connections |
| Database | PostgreSQL | ACID + relational | Storage/query performance bottleneck |
| Cache | Redis | Sub-ms access | Hitting Redis memory limits |
| Trading | In-memory | Prototype speed | Need persistence or multi-instance |
| Frontend | React | Component reuse | Need better performance |
| Charts | Recharts | Good enough | Need <100ms update latency |
| Deployment | Docker local | Easy testing | Ready for production |

---

## References & Further Reading

- **Fastify Docs:** https://www.fastify.io/docs/latest/
- **WebSocket Best Practices:** https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- **PostgreSQL Performance:** https://www.postgresql.org/docs/current/sql.html
- **Redis Patterns:** https://redis.io/topics/patterns
- **React Best Practices:** https://react.dev/learn
- **Trading System Design:** https://en.wikipedia.org/wiki/Electronic_communication_network

---

*Last Updated: April 2026*
*Status: Prototype Phase*
