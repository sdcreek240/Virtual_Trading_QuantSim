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

## 💸 Phase 4: Trading Engine (The Core)
- [ ] Trade execution logic (BUY/SELL)
- [ ] Portfolio cost-basis calculation engine
- [ ] Order history tracking
- [ ] Balance validation & updates

## 🧪 Phase 5: Testing & Quality Assurance
- [ ] Unit testing setup (Vitest/Jest)
- [ ] Integration testing for API endpoints
- [ ] E2E testing for critical flows (Trading)
- [ ] CI/CD pipeline integration

## 🎨 Phase 6: Frontend Dashboard
- [ ] React + Tailwind setup
- [ ] Live price charts (Recharts/Lightweight Charts)
- [ ] Interactive trade form
- [ ] Portfolio overview & performance tracking

---

### Current Focus:
Implementing the Market Data service and preparing for a rigorous testing phase to ensure system reliability.
