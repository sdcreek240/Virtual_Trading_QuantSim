# Project Context: QuantSim

## Core Mission
QuantSim is a high-performance virtual trading platform designed to simulate real-world market conditions. It emphasizes low-latency data streaming and precise trade execution.

## Technical Deep Dive

### Fastify (Backend Framework)
**What it is:** Fastify is a web framework for Node.js that is highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture.

**Why we use it here:**
1. **Speed:** It's significantly faster than Express (often 2x-5x higher throughput).
2. **Schema Validation:** It uses JSON Schema to validate inputs and outputs, which also makes the API self-documenting.
3. **Plugins:** Everything is a plugin. This helps keep the codebase modular and encapsulated.
4. **Asynchronous:** Built with `async/await` from the ground up.

### Database Strategy (Prisma + PostgreSQL)
- **Schema-first**: We define models in `schema.prisma`.
- **Financial Integrity**: We use the `Decimal` type for all currency and quantity fields. In JavaScript, these are handled by the `decimal.js` library via Prisma to avoid `0.1 + 0.2 !== 0.3` issues.
- **Relational Model**: Assets are the core registry. Trades, Portfolios, and Watchlists all reference `Asset.symbol`.

### Real-time Architecture
- **WebSockets**: Handled via the `ws` library, integrated into the Fastify server.
- **Redis**: Used for high-speed caching of current market prices and as a Pub/Sub bus for streaming updates to connected clients.

## Development Workflow
- **Migrations**: Run `npx prisma migrate dev` after changing the schema.
- **Seeding**: Use `backend/prisma/seed.ts` to populate the database with initial assets.
- **API Docs**: Located in `backend/docs/routes/`. These should be updated when route logic changes.

## AI Optimization Tips
- **Grep First**: When looking for logic, grep `src/services/` as that's where the core business rules live.
- **Check Types**: Always look at `src/types/` to understand the data structures before implementing a change.
- **Follow the Pattern**: If adding a new feature, follow the `Route -> Controller -> Service -> DB` flow established in the project.
