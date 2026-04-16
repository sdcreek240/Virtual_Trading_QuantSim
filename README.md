# QuantSim - Virtual Trading Platform

> High-performance virtual trading simulator with real-time market data

QuantSim is a browser-based sandbox trading environment that streams live market data to users. Practice investment strategies risk-free with virtual currency, real-time charts, and instant trade execution.

Built from the ground up for performance using **C++ on the backend**.

---

## 🚀 Tech Stack

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| **Backend**  | Modern C++ (C++20) + Drogon (HTTP/WebSocket) |
| **Database** | PostgreSQL + Redis (caching)                 |
| **Frontend** | React + TypeScript + TailwindCSS             |
| **Charts**   | Lightweight Charts / Recharts                |
| **Build**    | CMake + Conan                                |
| **Deploy**   | Docker + Render / Fly.io                     |

---

## 📁 Directory Layout

```bash
Virtual_Trading_QuantSim/
├── backend/
│   ├── src/
│   │   ├── api/          # REST endpoints (trades, portfolio)
│   │   ├── websocket/    # Real-time price streams
│   │   ├── trading/      # Order execution & matching
│   │   ├── portfolio/    # User holdings & P&L
│   │   ├── data/         # API fetching & caching
│   │   └── main.cpp      # Entry point
│   ├── include/          # Headers
│   ├── tests/            # Unit tests (Catch2)
│   └── CMakeLists.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chart.tsx
│   │   │   ├── TradeForm.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   └── OrderBook.tsx
│   │   ├── pages/        # Dashboard, Login
│   │   ├── hooks/        # WebSocket, API calls
│   │   ├── store/        # State management
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

Tailored for solo development

```text
main ─────────────────────────────────────────►
│
├── feature/feature-name ───────────────┐
├── fix/bug-description ────────────────┤
└── experimental/idea (optional) ───────┘
```

### Rules

| Branch           | Purpose                         |
| ---------------- | ------------------------------- |
| `main`           | Always stable and deployable    |
| `feature/*`      | New functionality               |
| `fix/*`          | Bug fixes                       |
| `experimental/*` | Risky ideas (delete if useless) |

### Workflow

```bash
# Start a feature
git checkout main
git pull
git checkout -b feature/real-time-chart

# Work...

# Merge
git checkout main
git merge --squash feature/real-time-chart
git commit -m "feat: add real-time chart component"
git push

# Cleanup
git branch -d feature/real-time-chart
```

No `develop`, no `release`, no `hotfix`.

---

## 🛠️ Getting Started (Local Dev)

### Prerequisites

* C++20 compiler (GCC 11+, Clang 14+, or MSVC 2022)
* CMake 3.20+
* Conan 2.0+
* Node.js 18+
* PostgreSQL 14+ (or Docker)
* Redis (optional)

---

### Quick Start

```bash
# Clone repo
git clone https://github.com/sdcreek240/Virtual_Trading_QuantSim.git
cd Virtual_Trading_QuantSim

# Backend
cd backend
conan install . --build=missing
cmake --preset default
cmake --build build
./build/quantsim_backend

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

## 📊 Current Status - 🚧/✅

* 🚧 Backend: HTTP server
* 🚧 Backend: WebSocket price streaming
* 🚧 Backend: Trade execution engine
* 🚧 Database: User & portfolio schema
* 🚧 API Integration: Market data fetcher
* 🚧 Frontend: Chart component
* 🚧 Frontend: Trade form
* 🚧 Frontend: Portfolio view
* 🚧 Deployment: Pending / In progress

See `docs/roadmap.md` for full milestones.

---

## 📝 License

MIT — free to use, modify, and distribute.

---

## 👤 Author

**Aidan Dawson**
Solo developer — architect, backend engineer, and builder
