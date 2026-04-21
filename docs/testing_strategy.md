# Testing Strategy — QuantSim

This document outlines the testing standards, tools, and strategy for the QuantSim project, ensuring high reliability for financial simulation and trading operations.

## 🏁 Testing Objectives
- **Reliability**: Ensure trade calculations and balance updates are accurate.
- **Security**: Validate that authentication and authorization (JWT) cannot be bypassed.
- **Stability**: Prevent regressions when adding new features or refactoring.
- **Performance**: Ensure the WebSocket price stream and API respond within acceptable thresholds.

---

## 🏗️ Testing Pyramid

### 1. Unit Tests (`/tests/unit`)
Focus on isolated business logic without external dependencies (DB, Redis, Network).
- **Tool**: [Vitest](https://vitest.dev/) (Industry standard for Vite/Fastify projects).
- **Scope**:
  - Utility functions (e.g., date formatting, currency rounding).
  - Domain logic (e.g., calculating cost-basis, validating trade eligibility).
  - Controller logic (via dependency injection).

### 2. Integration Tests (`/tests/integration`)
Verify how components interact, including Database (Prisma) and Redis.
- **Tool**: Vitest + `fastify.inject()` + [Testcontainers](https://testcontainers.com/) (Optional for Docker-based DB testing).
- **Scope**:
  - API Routes (Request/Response validation).
  - Database Services (Prisma queries and transactions).
  - Middleware (JWT verification, role checks).

### 3. E2E Tests (`/tests/e2e`)
Validate the complete system flow from the user perspective.
- **Backend Tool**: Vitest + Supertest.
- **Frontend Tool**: [Playwright](https://playwright.dev/) or Cypress.
- **Scope**:
  - Full registration → login → trade → portfolio update flow.
  - Real-time price updates appearing in the dashboard via WebSocket.

---

## 🛠️ Industry Standard Practices

### 1. TDD (Test-Driven Development)
Highly recommended for core financial logic (e.g., the Trading Engine). Write the test cases for edge cases (insufficient balance, decimal precision) before implementing the logic.

### 2. Mocking & Stubbing
- Use **stubs** for external APIs (e.g., real market data providers).
- Use **mocks** for Redis and WebSocket broadcasts during unit tests to avoid infrastructure overhead.

### 3. Automated Validation (CI)
- Tests must run on every Pull Request.
- **Minimum Coverage**: Aim for 80% code coverage, with 100% coverage on critical trading logic.
- **Linter & Type Checks**: `npm run lint` and `tsc` must pass before tests run.

---

## 📋 Recommended Testing Document Template

Every major feature (e.g., `MarketData`, `TradingEngine`) should have a corresponding test plan:

| Test Case ID | Description | Input | Expected Output | Status |
|--------------|-------------|-------|-----------------|--------|
| TC-01 | Successful User Login | Valid Email/Pass | 200 OK + JWT Tokens | ✅ |
| TC-02 | Trade with Insufficient Funds | Buy order > Balance | 400 Bad Request + Error | 📋 |

---

## 🚀 Next Steps for QuantSim
1. **Initialize Testing Framework**: Install `vitest` and `@fastify/jwt` test helpers.
2. **First Test Suite**: Implement unit tests for `UserService` and `UserController`.
3. **Database Mocking**: Setup a separate test database or use Prisma mock client for unit tests.
