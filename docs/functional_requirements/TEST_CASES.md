# Functional Test Cases

These test cases ensure that each User Story meets its Acceptance Criteria (AC).

## E01: Secure Identity & Access Management

| Test ID | Story Reference | Description | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | **US01** | Register New User | 1. POST `/user/register` with valid email/pass.<br>2. Check DB. | User created, password hashed, 201 Created returned. |
| **TC02** | **US01** | Register Duplicate User | 1. POST `/user/register` with existing email. | 409 Conflict returned. |
| **TC03** | **US02** | Login Valid User | 1. POST `/user/login` with correct credentials. | 200 OK with JWT token returned. |

## E02: Live Market Data Feed

| Test ID | Story Reference | Description | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC04** | **US03** | Search Assets | 1. GET `/market/assets?q=AAPL`. | Array containing Apple asset info returned. |
| **TC05** | **US04** | WebSocket Connection | 1. Connect to `ws://localhost:3000`.<br>2. Wait for message. | JSON message with price update received. |

## E03: Real-Time Trading Engine

| Test ID | Story Reference | Description | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC06** | **US05** | Buy Asset (Valid) | 1. POST `/trades/buy` with $1000 order.<br>2. Verify balance. | Balance reduced by $1000, trade record created. |
| **TC07** | **US05** | Buy Asset (Insufficient Funds) | 1. POST `/trades/buy` exceeding balance. | 400 Bad Request / Insufficient Funds returned. |
| **TC08** | **US06** | Sell Asset (Valid) | 1. Buy 1 AAPL.<br>2. POST `/trades/sell` for 1 AAPL. | Balance increased, holding removed/reduced. |

## E04: Interactive Trading Dashboard (UI)

| Test ID | Story Reference | Description | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC09** | **US07** | Chart Data Fetching | 1. Load StockPage for "BTC".<br>2. Check network tab for history API. | Chart renders points based on API response. |
| **TC10** | **US07** | Live Price Propagation | 1. Receive WS message for price change.<br>2. Observe UI chart/price. | Price updates on screen within <100ms. |

---

*Last Updated: April 2026*
*Status: Test Cases Defined*
