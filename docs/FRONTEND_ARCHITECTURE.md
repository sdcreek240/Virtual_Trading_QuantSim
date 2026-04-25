# Frontend Architecture & Modularity

This document outlines the architectural principles and directory structure for the QuantSim frontend to ensure long-term modularity, maintainability, and scalability.

## Core Principles

1.  **Feature-Based Organization:** Group code by business feature rather than technical type (e.g., `features/trading` instead of putting everything in `components/`).
2.  **Strict Component Hierarchy:**
    *   **Elements (Shared UI):** Pure presentational components (Buttons, Inputs, Spinners). No business logic.
    *   **Features:** Domain-specific components and logic (TradeForm, OrderHistory).
    *   **Pages:** Composition of features and layouts.
3.  **Hooks for Logic:** Move complex business logic, API calls, and state management into custom hooks.
4.  **Context-Driven State:** Use React Context for global state (Auth, Theme, Portfolio) and local state for feature-specific needs.
5.  **Type Safety:** Use TypeScript for all components, hooks, and API responses.

---

## Proposed Directory Structure (Migration Path)

As the project grows beyond the prototype phase, the `frontend/src` directory should evolve into this modular structure:

```bash
frontend/src/
├── assets/             # Global static assets (images, icons)
├── core/               # Global singletons and core logic
│   ├── api/            # Base API client (Axios/Fetch config)
│   ├── config/         # Environment variables and app constants
│   ├── types/          # Global TypeScript interfaces
│   └── utils/          # Generic helper functions
├── components/         # Shared UI Library (Atomic Design)
│   ├── ui/             # Reusable base elements (Button, Input, Modal)
│   └── layout/         # Shared layout components (Sidebar, Navbar)
├── context/            # Global React Contexts (Auth, Portfolio)
├── features/           # Domain-driven feature modules
│   ├── market/         # Market data, search, and charts
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── trading/        # Order placement and history
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── portfolio/      # Asset holdings and performance
│       ├── components/
│       ├── hooks/
│       └── services/
├── pages/              # Route entry points (Route Composition)
├── styles/             # Global CSS and Tailwind configuration
└── App.tsx             # Main routing and provider setup
```

## Modular Development Strategy

### 1. Decoupling Components from API
Features should never call APIs directly. Instead:
-   Define a **Service** (e.g., `trading.service.ts`) for raw API calls.
-   Create a **Hook** (e.g., `useTrade.ts`) that manages loading states, errors, and data fetching.
-   **Components** consume the Hook.

### 2. UI Component Library
To maintain consistency, all "dumb" components (Buttons, Cards, Modals) should live in `components/ui/`. This allows us to swap styling or libraries (e.g., Radix UI, Shadcn) without touching business logic.

### 3. Real-Time Data (WebSockets)
WebSocket logic should be encapsulated in a dedicated hook/service within the `market` feature.
-   `usePriceStream(symbol)`: Subscribes to a symbol and returns the latest price.
-   Internal logic handles the shared WebSocket connection to prevent multiple redundant connections.

## Future Modularity: WebWorkers & High Performance
For high-frequency chart updates, we can move data processing into a **WebWorker** to keep the UI thread smooth. This modular approach allows us to "drop in" performance optimizations without refactoring the entire UI.

---

*Last Updated: April 2026*
*Status: Architecture Guideline*
