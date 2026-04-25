Copilot↔Gemini Alignment

Timestamp: 2026-04-25T14:54:00+02:00

Summary:
- Copilot read and synchronized on these authoritative files: COPILOT.md, GEMINI.md, agents_collaboration/PROJECT_CONTEXT.md, agents_collaboration/personas/TiffEx.md, and agents_collaboration/sync/TiffEx_snapshot.md.
- Copilot will use agents_collaboration/ as the single shared folder for planning, persona definitions, snapshots, and sync artifacts.

Operational rules Copilot will follow:
1. On session start, run ./scripts/resume_tiffex.sh and/or open agents_collaboration/sync/TiffEx_snapshot.md.
2. Always read agents_collaboration/PROJECT_CONTEXT.md, agents_collaboration/db/ERD.md (if present), and COPILOT.md before coding or DB changes.
3. Create plans in agents_collaboration/plans/; post short handoffs in agents_collaboration/sync/ and update session `todos` via SQL.
4. Update agents_collaboration/sync/TiffEx_snapshot.md (or regenerate with scripts/generate_tiffex_snapshot.sh) after major changes.

Notes:
- This file is a runtime alignment artifact. Keep it short and update when responsibilities or initialization routines change.
