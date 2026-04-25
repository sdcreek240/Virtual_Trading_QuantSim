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

## ✅ Phase 2: User & Auth (Complete)
- [x] JWT authentication strategy using `@fastify/jwt`
- [x] User login/registration endpoints
- [x] Password hashing & security (Bcrypt)
- [x] Auth middleware for protected routes
- [x] User-based route prefixing (`/user`)
- [x] Role-based user model (USER/ADMIN)

## 🚧 Phase 3: Market Data & Assets (Current)
- [ ] Asset discovery endpoints (Search/Filter)
- [ ] Live price streaming via WebSocket
- [ ] Historical data retrieval (OHLCV)
- [ ] Market snapshot caching in Redis
- [ ] Frontend Market Explorer & Asset Search

## 💸 Phase 4: Trading Engine (Core Development)
- [ ] Trade execution logic (BUY/SELL) - *In-Memory First*
- [ ] Portfolio cost-basis calculation engine
- [ ] Order history tracking & Audit Logs
- [ ] Balance validation (Virtual Cash)

## 🎨 Phase 5: Interactive UI & Dashboard
- [ ] Refactor Frontend to Modular Feature-Based Architecture
- [ ] Real-time charts integration (Lightweight Charts)
- [ ] Trade Form with instant feedback
- [ ] Portfolio overview & performance tracking (ROI)

## 🧪 Phase 6: Testing & Quality Assurance
- [ ] Unit testing (Vitest/Jest) for Trading Engine
- [ ] Integration testing for API endpoints
- [ ] E2E testing for critical flows (Registration -> Trade -> Portfolio)

---

### Current Focus:
Implementing the **Market Data Service** (Phase 3) and refactoring the **Frontend** (Phase 5 prep) to ensure long-term modularity as defined in `docs/FRONTEND_ARCHITECTURE.md`.
