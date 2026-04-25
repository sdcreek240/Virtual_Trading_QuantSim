COPILOT AGENT RESPONSIBILITIES

Purpose
- Serve as the repository-aware Copilot CLI agent for the QuantSim project.
- Maintain alignment and synchronization between Copilot and Gemini agents.

🔄 Collaboration & Sync Protocol
- **Shared Brain**: Before starting any task, read `agents_collaboration/brain.md`.
- **Sync Routine**: Follow the "Wake Up" and "Shutdown" routines defined in the Brain.
- **Shared Folder**: `agents_collaboration/` is the authoritative directory for planning, sync, and context.

Collaboration folder
- Use agents_collaboration/ for:
  1. planning: save plan.md and feature plans under agents_collaboration/plans/
  2. collaboration: use agents_collaboration/sync/ for handoffs, session notes, and agent sync artifacts.
  3. context: PROJECT_CONTEXT.md, API_CONTRACTS.md, and the db/ directory live here.

Conventions
- Always author or update plans in agents_collaboration/plans/{short-name}-plan.md.
- When making changes, update COPILOT.md or GEMINI.md if role handoffs occur.
- Add clear timestamps and agent initials in files under agents_collaboration/sync/.
- Keep each file small and focused; prefer multiple specific files over one large dump.

Sync procedure
1. **Wake Up**: Read `brain.md`, check `sync/` for recent handoffs, and verify `db/DATA_DICTIONARY.md`.
2. **Implement**: Work within the agreed plans. Update `API_CONTRACTS.md` if routes change.
3. **Shutdown**: Leave a note in `sync/`, update any relevant documentation in `agents_collaboration/`, and mark tasks as done.

Commit & file rules
- Use `git mv` when renaming collaboration directories to preserve history.
- Add Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com> to commits made by this agent.

Contact
- This file is the authoritative summary of Copilot agent responsibilities. Keep it under source control.

Personas & Resuming
- Personas are stored in agents_collaboration/personas/. The TiffEx persona is at agents_collaboration/personas/TiffEx.md and defines initialization steps and tone.
- Quick resume snapshot: agents_collaboration/sync/TiffEx_snapshot.md — use this to restore session context.
- Scripts: scripts/resume_tiffex.sh prints the snapshot and opens priority files. scripts/generate_tiffex_snapshot.sh regenerates the snapshot from key files (run this before pushing significant changes).

Automation
- Recommended: run scripts/generate_tiffex_snapshot.sh after major updates or add it to a pre-push hook.
- When creating or closing todos, update the session snapshot and add a short handoff note in agents_collaboration/sync/.

Guidelines for next Copilot session
1. Run ./scripts/resume_tiffex.sh to view the snapshot and open priority files.
2. Read agents_collaboration/PROJECT_CONTEXT.md, agents_collaboration/db/ERD.md, and agents_collaboration/plans/initial-backend-design-plan.md before coding.
3. Update agents_collaboration/sync/TiffEx_snapshot.md after major changes.
