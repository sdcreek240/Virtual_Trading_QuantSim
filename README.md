# QuantSim - Virtual Trading Platform

> High-performance virtual trading simulator with real-time market data

QuantSim is a browser-based sandbox trading environment that streams live market data to users. Practice investment strategies risk-free with virtual currency, real-time charts, and instant trade execution.

Built for **real-time performance and rapid development using Node.js**.

---

## 🚀 Tech Stack

| Layer        | Technology                             |
| ------------ | -------------------------------------- |
| **Backend**  | Node.js (Fastify) + WebSockets (`ws`)  |
| **Database** | PostgreSQL + Redis (caching & pub/sub) |
| **Frontend** | React + TypeScript + TailwindCSS       |
| **Charts**   | Lightweight Charts / Recharts          |
| **Build**    | npm + Vite                             |
| **Deploy**   | Docker + Render / Fly.io               |

---

## 🧠 Architecture Overview

```text
Client (React)
   │
   ├── REST API (HTTP)
   │       ↓
   │   Node.js Backend (Fastify)
   │       ├── Trade Engine (in-memory logic)
   │       ├── Portfolio Service
   │       ├── Market Data Service
   │       └── Auth (future)
   │
   ├── WebSocket Connection
   │       ↓
   │   Real-time Price + Order Updates
   │
   ├── PostgreSQL (persistent data)
   │
   └── Redis
           ├── Cache (prices, sessions)
           └── Pub/Sub (real-time updates)
```

---

## 📁 Directory Layout

```bash
Virtual_Trading_QuantSim/
├── backend/
│   ├── src/
│   │   ├── routes/        # REST endpoints
│   │   ├── websocket/     # WebSocket handlers
│   │   ├── trading/       # Order execution logic
│   │   ├── portfolio/     # Holdings & P&L
│   │   ├── market/        # Market data ingestion
│   │   ├── services/      # Shared services
│   │   └── server.ts      # Entry point
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chart.tsx
│   │   │   ├── TradeForm.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   └── OrderBook.tsx
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
│
├── database/
│   ├── schema.sql
│   └── migrations/
│
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── docs/
├── scripts/
├── .gitignore
└── README.md
```

---

## 🌿 Branching Strategy (Solo Developer)

```text
main ─────────────────────────────────────────►
│
├── feature/feature-name ───────────────┐
├── fix/bug-description ────────────────┤
└── experimental/idea ───────┘
```

### Rules

| Branch           | Purpose           |
| ---------------- | ----------------- |
| `main`           | Always deployable |
| `feature/*`      | New features      |
| `fix/*`          | Bug fixes         |
| `experimental/*` | Risky ideas       |

---

## ⚙️ Core Features

* Real-time price streaming (WebSockets)
* Instant trade execution (in-memory engine)
* Portfolio tracking (P&L, positions)
* Order book simulation
* Market data ingestion (API-based)

---

## 🛠️ Getting Started (Local Dev)

### Prerequisites

* Node.js 18+
* PostgreSQL 14+
* Redis (optional but recommended)
* Docker (optional)

---

### Quick Start

```bash
# Clone repo
git clone https://github.com/yourusername/Virtual_Trading_QuantSim.git
cd Virtual_Trading_QuantSim

# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🐳 Using Docker

```bash
docker-compose up --build
```

---

## 📊 Current Status 🚧/ ✅

* 🚧 Backend: HTTP API scaffold
* 🚧 Backend: WebSocket server
* 🚧 Trade engine (in progress)
* 🚧 Market data integration
* 🚧 Portfolio system
* 🚧 Frontend integration

See `docs/roadmap.md` for milestones.

---

## 🧠 Future Scaling Plan

When performance becomes a bottleneck:

* Move trade execution engine → **C++ microservice**
* Keep Node.js → API gateway
* Use Redis → event streaming layer

---

## 📝 License

MIT — free to use, modify, and distribute.

---

## 👤 Author

**Aidan Dawson**
Solo developer - architect, backend engineer, and builder
