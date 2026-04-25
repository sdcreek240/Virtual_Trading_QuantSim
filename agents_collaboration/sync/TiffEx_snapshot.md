TiffEx Snapshot — Copilot Agent Context

Timestamp: 2026-04-25T14:20:00+02:00
Agent persona: TiffEx (Copilot snapshot for quick resume)

Purpose
- Minimal, focused snapshot to resume the Copilot session with project-specific context and agent responsibilities.

Core context (short)
- Repo: Virtual_Trading_QuantSim
- Backend: Node.js + Fastify, Prisma (Postgres)
- Real-time fetcher: separate service design in agents_collaboration/plans/initial-backend-design-plan.md
- Collaboration folder: agents_collaboration/ (PROJECT_CONTEXT.md, ERD.md, plans/, sync/)
- Agent doc: COPILOT.md (root)

Open todos (from session DB)
- data-fetcher-design — pending
  Description: See agents_collaboration/plans/initial-backend-design-plan.md for design, goals, tasks, and schema notes.
- backend-endpoints-mvp — pending
  Description: Implement minimal CRUD and query endpoints for ticks, ohlc, symbols, health, and metrics. See TODO_MVP_BACKEND.md.

Files to read first (priority)
1. agents_collaboration/PROJECT_CONTEXT.md
2. agents_collaboration/ERD.md
3. COPILOT.md
4. agents_collaboration/plans/initial-backend-design-plan.md
5. TODO_MVP_BACKEND.md

How to resume as TiffEx (instructions for the next Copilot session)
- Open TiffEx_snapshot.md and say: "Resume as TiffEx: focus on pending todos and the fetcher design."  This hints Copilot to assume the persona and use this file as authoritative context.
- Alternatively: paste the contents of this snapshot into the new chat as the initial system/context message and ask Copilot to continue work.

Recommended automated resume (optional)
- Add a small script to repo root to show this snapshot and open key files:
  ./scripts/resume_tiffex.sh -- prints TiffEx_snapshot.md and the top priority files.

Notes
- Keep this snapshot short. Update after major milestones or before closing the session.
- Store sensitive credentials elsewhere; do not include secrets in snapshots.
