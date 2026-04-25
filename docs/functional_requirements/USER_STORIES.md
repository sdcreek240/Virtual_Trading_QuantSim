# User Stories & Acceptance Criteria

This document breaks down the Epics into specific, testable User Stories.

## E01: Secure Identity & Access Management (Must-Have)

### US01: User Registration
**As a** new user,  
**I want to** create a new account with my email and a password,  
**So that** I can start using the QuantSim platform.
-   **AC1:** Account is created in the database with a hashed password.
-   **AC2:** User is automatically logged in and receives a JWT token.
-   **AC3:** Prevents duplicate registration with the same email.

### US02: User Login
**As a** registered user,  
**I want to** login with my credentials,  
**So that** I can access my private portfolio and trade.
-   **AC1:** Returns a valid JWT token on successful login.
-   **AC2:** Returns clear error messages for invalid credentials.

---

## E02: Live Market Data Feed (Must-Have)

### US03: Search & Filter Assets
**As a** trader,  
**I want to** search for assets by symbol or name,  
**So that** I can find exactly what I want to trade.
-   **AC1:** Endpoint returns a list of assets matching the query.
-   **AC2:** Assets can be filtered by type (Stock, Crypto).

### US04: Real-Time Price Updates
**As a** trader,  
**I want to** see prices update in real-time without refreshing the page,  
**So that** I can make timely trading decisions.
-   **AC1:** WebSocket connection stays open and pushes price updates.
-   **AC2:** UI updates the price and change percentage within 100ms of receipt.

---

## E03: Real-Time Trading Engine (Must-Have)

### US05: Place Buy Order
**As a** trader,  
**I want to** buy an asset at the current market price,  
**So that** I can add it to my portfolio.
-   **AC1:** Order executes instantly if user has sufficient virtual cash.
-   **AC2:** Virtual cash balance is deducted.
-   **AC3:** Portfolio holdings are updated (new asset added or quantity increased).

### US06: Place Sell Order
**As a** trader,  
**I want to** sell an asset I own,  
**So that** I can realize my gains or losses.
-   **AC1:** Order executes instantly if user owns the asset.
-   **AC2:** Virtual cash balance is increased.
-   **AC3:** Portfolio holdings are updated (asset removed or quantity decreased).

---

## E04: Interactive Trading Dashboard (Must-Have)

### US07: View Live Chart
**As a** trader,  
**I want to** see a line or candlestick chart for a specific asset,  
**So that** I can analyze price trends.
-   **AC1:** Chart renders correctly with historical data.
-   **AC2:** Chart updates in real-time when new price points arrive via WebSocket.

---

*Last Updated: April 2026*
*Status: User Stories Defined*
