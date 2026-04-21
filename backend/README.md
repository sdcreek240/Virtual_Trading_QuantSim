# QuantSim Trading Backend

A robust, real-time trading simulation backend built with Fastify, Prisma, and PostgreSQL.

## Features
- **User Authentication:** JWT-based login/registration with secure password hashing.
- **Real-time Market Data:** WebSocket support for live price updates (Initial setup).
- **Comprehensive Database:** Optimized schema for users, assets, trades, and market snapshots.
- **Health Monitoring:** Built-in health check endpoint with database latency reporting.
- **Strict Validation:** Integrated data validation for all user-facing endpoints.

## Tech Stack
- **Framework:** [Fastify](https://www.fastify.io/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Cache/Store:** [Redis](https://redis.io/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Auth:** [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) + [Fastify JWT](https://github.com/fastify/fastify-jwt)

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (for PostgreSQL & Redis)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start infrastructure (via root docker-compose):
   ```bash
   docker-compose up -d
   ```
5. Initialize the database:
   ```bash
   npx prisma migrate dev
   npx tsx prisma/seed.ts
   ```
6. Run in development mode:
   ```bash
   npm run dev
   ```

## Documentation
- [API Contracts](./docs/routes/README.md)
- [Database Schema](./docs/database/README.md)
- [Design Decisions](../docs/design_decisions.md)

## Project Structure
```text
backend/
├── prisma/             # Database schema and migrations
├── src/
│   ├── config/         # Environment configuration
│   ├── controllers/    # Request handlers
│   ├── lib/            # Shared libraries (Prisma client, Auth utils)
│   ├── middleware/     # Fastify hooks (Authentication)
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic layer
│   ├── types/          # TypeScript interfaces and validations
│   └── websocket/      # Real-time communication server
└── docs/               # Detailed technical documentation
```
