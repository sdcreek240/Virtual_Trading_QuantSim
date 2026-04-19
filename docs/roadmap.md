# QuantSim Roadmap

## ✅ Phase 1: Infrastructure & Core Setup (Complete)
- [x] Project workspace structure
- [x] Fastify server with TypeScript
- [x] PostgreSQL + Prisma integration
- [x] Redis connection for real-time caching
- [x] WebSocket server initialization
- [x] Docker + Docker Compose orchestration
- [x] Database health check monitoring
- [x] Full database seeding script (derived portfolios/history)

## 🚧 Phase 2: User & Auth (Current)
- [ ] JWT authentication strategy
- [ ] User login/registration endpoints
- [ ] Password hashing & security
- [ ] Auth middleware for protected routes

## 📈 Phase 3: Market Data & Assets
- [ ] Asset discovery endpoints (Search/Filter)
- [ ] Live price streaming via WebSocket
- [ ] Historical data retrieval (OHLCV)
- [ ] Market snapshot caching in Redis

## 💸 Phase 4: Trading Engine (The Core)
- [ ] Trade execution logic (BUY/SELL)
- [ ] Portfolio cost-basis calculation engine
- [ ] Order history tracking
- [ ] Balance validation & updates

## 🎨 Phase 5: Frontend Dashboard
- [ ] React + Tailwind setup
- [ ] Live price charts (Recharts/Lightweight Charts)
- [ ] Interactive trade form
- [ ] Portfolio overview & performance tracking

---

### Current Focus:
Setting up the API contracts for the core routes to ensure consistent data structures before implementation.
