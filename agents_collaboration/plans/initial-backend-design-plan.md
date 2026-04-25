Initial Backend Data-Fetcher Design Plan

Title: Real-time Data Fetcher Service (isolated)

Context:
- Need a high-performance, isolated component to fetch live market data and populate the DB without affecting API endpoints.
- Must respect financial precision (use Decimal), be resilient to rate limits, and be deployable separately (process/container).

Goals:
- Run concurrently with the main app but isolated (separate process/container).
- Provide reliable ingestion of live prices/ticks and periodic OHLC aggregation.
- Minimize latency and CPU/IO impact on the HTTP server.
- Be extensible: add adapters for multiple data sources.

Non-functional requirements:
- Financial precision: use decimal.js and Prisma Decimal for DB writes.
- High-throughput writes using batching and bulk inserts.
- Backpressure handling: avoid unbounded queues.
- Observability: health endpoint, metrics, logs, and alerts.

High-level architecture:
1. Fetcher Service (separate Node.js + TypeScript process)
   - Runs as its own Docker container or systemd service.
   - Exposes a lightweight Fastify health endpoint (no heavy routes).
   - Responsible for connecting to market data providers (WebSocket/REST) using source adapters.

2. Adapter Layer
   - One adapter per data provider/exchange.
   - Normalizes messages to canonical tick format: {symbol, ts, price, size, raw}
   - Handles provider auth, subscription, reconnection/backoff, rate-limit compliance.

3. In-memory bounded queue + batcher
   - Buffer incoming normalized ticks in a bounded queue (size limit configurable).
   - Batcher flushes every N ms or when M items collected, converts prices/quantities to Decimal, and writes via bulk insert.

4. Writer / DB layer
   - Use Prisma client with Decimal mappings.
   - Bulk insert raw ticks into market_ticks table (use COPY if available or Prisma createMany with chunking).
   - Periodic aggregator writes OHLC into derived tables (1s/1m/1h) or use materialized views.
   - Use UPSERT semantics for idempotency where necessary.

5. Decoupling options (if more isolation needed)
   - Use Redis or Kafka for buffering between fetcher and writer; improves durability and allows horizontal scaling.
   - Use worker queue (BullMQ) for retry semantics.

Performance & safety:
- Keep fetcher CPU- and I/O-light: parsing, normalization, and buffering only; delegate heavy compute (aggregation) to a separate worker if needed.
- Bulk DB writes to reduce transactions and connection churn.
- Use a separate DB user/role and connection pool settings for fetcher to avoid maxing out connections used by web app.
- Use circuit-breaker and backoff when DB is slow; persist to durable queue (Redis) when DB write fails.

Schema notes (Prisma sketch):

model MarketTick {
  id        Int      @id @default(autoincrement())
  symbol    String
  ts        DateTime @index
  price     Decimal  @db.Decimal(30, 10)
  size      Decimal  @db.Decimal(30, 10)
  raw       Json
}

model OHLC {
  id        Int      @id @default(autoincrement())
  symbol    String
  interval  String
  ts        DateTime @index
  open      Decimal  @db.Decimal(30, 10)
  high      Decimal  @db.Decimal(30, 10)
  low       Decimal  @db.Decimal(30, 10)
  close     Decimal  @db.Decimal(30, 10)
  volume    Decimal  @db.Decimal(30, 10)
}

Tasks (initial):
- [ ] Research target data providers + choose adapters (e.g., Binance, Coinbase, AlphaVantage, IEX) and auth models.
- [ ] Implement adapter interface and 1st adapter (WebSocket example).
- [ ] Implement bounded queue, batcher, and writer with Prisma bulk insert.
- [ ] Add health endpoint and metrics (Prometheus compatible).
- [ ] Dockerize the service and add a small systemd or Docker Compose entry.
- [ ] Add integration tests for adapter + fake provider, and load test for batching.

Success criteria:
- Fetcher runs independently, ingesting live ticks with <200ms processing latency and sustained write throughput matching source rates.
- No observable degradation in API endpoints under normal load.
- Graceful handling of provider outages and DB slowdowns.

Next steps:
- Create session SQL todo and break tasks into tracked todos.
- Implement the adapter interface and prototype the WebSocket adapter.

References:
- agents_collaboration/PROJECT_CONTEXT.md
- agents_collaboration/ERD.md
