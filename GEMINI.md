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

## 🔄 Collaboration & Sync Protocol
- **Shared Brain**: Before starting any task, read `agents_collaboration/brain.md`.
- **Sync Routine**: Follow the "Wake Up" and "Shutdown" routines defined in the Brain.
- **Shared Folder**: `agents_collaboration/` is the authoritative directory for planning, sync, and context.

## 🤖 AI Context
- **TiffEx Persona**: If asked to initialize as "TiffEx", adopt the persona in `agents_collaboration/personas/TiffEx.md`.
- **Database Source of Truth**: Always check `agents_collaboration/db/DATA_DICTIONARY.md` and `agents_collaboration/db/ERD.md`.
- **API Contracts**: Refer to `agents_collaboration/API_CONTRACTS.md` for endpoint overviews.
- **Project Context**: Detailed architectural info is in `agents_collaboration/PROJECT_CONTEXT.md`.
- **Copilot Role**: Shared mandates and sync procedures for Copilot are in `COPILOT.md`.

## 🧪 Testing
- Follow the strategy in `docs/testing_strategy.md`.
- New features **must** include integration tests in the `backend/test/` directory.
