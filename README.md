# QuantSim - Virtual Trading Platform

> High-performance virtual trading simulator with real-time market data

QuantSim is a browser-based sandbox trading environment that streams live market data to users. Practice investment strategies risk-free with virtual currency, real-time charts, and instant trade execution.

Built for **real-time performance and rapid development using Node.js**.

---

## 🚀 Tech Stack

| Layer        | Technology                             |
| ------------ | -------------------------------------- |
| **Backend**  | Node.js (Fastify) + WebSockets (`ws`)  |
| **Database** | PostgreSQL + Prisma (ORM) + Redis      |
| **Auth**     | JWT + Bcrypt (Stateless Auth)          |
| **Frontend** | React + TypeScript + TailwindCSS       |
| **Charts**   | Lightweight Charts / Recharts          |
| **Build**    | npm + Vite                             |
| **Deploy**   | Docker (local) + Render / Fly.io (future) |

---

## 🧠 Architecture Overview

```text
Client (React)
   │
   ├── REST API (HTTP)
   │       ↓
   │   Node.js Backend (Fastify)
   │       ├── Auth Service (JWT/Bcrypt) ✅
   │       ├── Trade Engine (in-memory logic) 🚧
   │       ├── Portfolio Service 🚧
   │       └── Market Data Service 🛠️
   │
   ├── WebSocket Connection
   │       ↓
   │   Real-time Price + Order Updates
   │
   ├── PostgreSQL (persistent data via Prisma)
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
│   │   ├── routes/        # REST endpoints (User, Market, etc.)
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic (User, DB, Redis)
│   │   ├── middleware/    # Auth & Validation
│   │   ├── websocket/     # WebSocket handlers
│   │   └── server.ts      # Entry point
│   ├── prisma/            # Database schema & migrations
│   ├── docs/              # API Contracts & Route docs
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Chart.tsx, TradeForm.tsx, etc.
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
│
├── docs/                  # System-wide documentation (Roadmap, Strategy)
├── docker/                # Dockerfile.backend & docker-compose.yml
└── README.md
```

---

## ⚙️ Core Features

* **Secure Authentication**: JWT-based login and registration with Bcrypt hashing.
* **Real-time Streaming**: Price updates via WebSockets for low-latency trading.
* **Scalable Database**: PostgreSQL for persistence and Redis for high-speed caching.
* **Modern API**: Fastify-based REST endpoints with standardized response models.

---

## 📊 Project Status ✅

**Current Milestone:** Phase 2 (User & Auth) Complete. Moving to Phase 3 (Market Data).

* ✅ **Phase 1: Infrastructure**: Fastify, Prisma, Redis, Docker setup complete.
* ✅ **Phase 2: User & Auth**: Secure registration and login implemented.
* 🛠️ **Phase 3: Market Data**: In progress. Asset discovery and price history.
* 📋 **Phase 4: Trading Engine**: Planned. Core execution logic.
* 🧪 **Phase 5: Testing**: Planned. Comprehensive testing strategy defined.

See `docs/roadmap.md` for the full detailed roadmap.

---

## 🛠️ Getting Started (Local Dev)

### Prerequisites

* Node.js 18+
* Docker & Docker Compose (for PostgreSQL/Redis)

### Quick Start

```bash
# Clone repo
git clone https://github.com/yourusername/Virtual_Trading_QuantSim.git
cd Virtual_Trading_QuantSim

# Setup Environment
cd backend
cp .env.example .env

# Launch Infrastructure (DB/Redis)
npm run docker:up

# Run Backend
npm run dev
```

---

## 🧪 Testing Strategy

We follow a rigorous testing pyramid (Unit → Integration → E2E). 
See `docs/testing_strategy.md` for our industry-standard testing approach.

---

## 📝 License

MIT — free to use, modify, and distribute.

---

## 👤 Author

**Aidan Dawson**
Solo developer - architect, backend engineer, and builder
