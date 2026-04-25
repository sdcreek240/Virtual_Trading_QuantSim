# QuantSim AI Guidelines

This file provides foundational context and mandates for AI agents working on the Virtual_Trading_QuantSim project.

## 🚀 Architecture & Tech Stack
- **Backend**: Node.js with **Fastify**. 
  - *Why Fastify?* It's chosen for high performance, low overhead, and built-in JSON schema validation.
  - *Preference*: Use plugins for encapsulation and `fastify-zod` or built-in schema for validation.
- **Database**: PostgreSQL with **Prisma ORM**.
  - *Constraint*: Always use `Decimal` for financial values (never `Float`).
  - *Pattern*: Use the `symbol` field as the primary join key for market-related tables.
- **Real-time**: WebSockets via `ws` (integrated into Fastify).
- **Frontend**: React (TypeScript) + TailwindCSS.

## 🛠️ Engineering Standards
- **Financial Precision**: All price and quantity calculations must use `decimal.js` or similar to avoid floating-point errors.
- **Service Pattern**: Business logic should reside in `src/services/`. Controllers should handle request/response mapping and call services.
- **Type Safety**: Ensure strict TypeScript usage. Define types in `src/types/`.
- **Documentation**: Keep `backend/docs/` updated when changing routes or database models.

## 🤖 AI Context
- Detailed project context is maintained in agents_collaboration/PROJECT_CONTEXT.md.
- Always check agents_collaboration/ERD.md before making database changes.
- Copilot-specific agent coordination and responsibilities are in COPILOT.md at the repo root.
- agents_collaboration is the shared planning & context folder used by AI agents (Copilot and Gemini). Keep important context, plans, and sync artifacts here.

## 🧪 Testing
- Follow the strategy in `docs/testing_strategy.md`.
- New features **must** include integration tests in the `backend/test/` directory (or wherever tests are located).
