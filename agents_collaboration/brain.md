# Agent Brain: Collaboration & Context Protocol

This file defines the operational "Shared Brain" for Gemini and Copilot agents working on the TiffEx (QuantSim) project.

## 🧠 Central Philosophy
We operate as a single distributed intelligence. Any discovery or decision made by one agent must be persisted in this directory to be "remembered" by the other.

## 📂 Shared Directory Structure (`agents_collaboration/`)

| Folder/File | Purpose | Update Frequency |
| :--- | :--- | :--- |
| **`db/`** | Database source of truth (ERD, Data Dictionary) | Every schema change |
| **`plans/`** | Active feature plans and TODOs | Before starting a feature |
| **`sync/`** | Hand-off notes, session logs, agent sync artifacts | Every session end |
| **`personas/`** | Specialized agent role definitions (e.g., TiffEx) | On role refinement |
| **`API_CONTRACTS.md`**| Unified endpoint map | Every route/controller change |
| **`PROJECT_CONTEXT.md`**| Deep-dive architecture and technical defaults | On major architectural shifts |

## 🔄 The Sync Protocol

### 1. The "Wake Up" Routine
Every session MUST start by reading:
- `GEMINI.md` / `COPILOT.md` (Role-specific mandates)
- `agents_collaboration/brain.md` (This file)
- `agents_collaboration/sync/` (Latest hand-off notes)

### 2. Implementation Loop
1. **Research**: Check if a plan exists in `plans/`. If not, create one.
2. **Strategy**: Validate against `db/` and `API_CONTRACTS.md`.
3. **Execution**: Implement changes.
4. **Validation**: Test and verify.

### 3. The "Shutdown" Routine
Before ending a session, an agent MUST:
1. Update any relevant documentation in `agents_collaboration/` (DB, API, etc.).
2. Create/Update a hand-off note in `sync/` with the current status and next steps.
3. Mark relevant TODOs as complete.

## ⚖️ Conflict Resolution
If documentation and code disagree, the **Prisma Schema** is the primary source of truth for the DB, and the **Route implementation** is the primary source of truth for the API. Update the documentation immediately to reflect the reality of the code.
