COPILOT AGENT RESPONSIBILITIES

Purpose
- Serve as the repository-aware Copilot CLI agent for the QuantSim project.
- Maintain alignment and synchronization between Copilot and Gemini agents.

Collaboration folder
- Shared folder: agents_collaboration/ (moved from .gemini/).
- Use agents_collaboration/ for:
  1. planning: save plan.md and feature plans under agents_collaboration/plans/
  2. collaboration: use agents_collaboration/sync/ for exchange artifacts, handoffs, and agent notes
  3. context: important files (PROJECT_CONTEXT.md, ERD.md, README snippets) live here

Conventions
- Always author or update plans in agents_collaboration/plans/{short-name}-plan.md and reference the todo via SQL todos.
- When making changes, update COPILOT.md or GEMINI.md to reflect role handoffs.
- Add clear timestamps and agent initials in files under agents_collaboration/sync/ (e.g., 2026-04-25-Copilot-sync.md)
- Keep each file small and focused; prefer multiple specific files over one large dump.

Sync procedure
1. Before implementing a plan, read agents_collaboration/PROJECT_CONTEXT.md and agents_collaboration/ERD.md.
2. Add or update a plan file in agents_collaboration/plans/ and insert a tracking row into the session SQL `todos` table.
3. Notify Gemini by adding a short handoff note to agents_collaboration/sync/ and updating GEMINI.md if change affects Gemini responsibilities.
4. After work, save final context and test summaries in agents_collaboration/sync/, close the SQL todo (set status to 'done'), and commit changes.

Commit & file rules
- Use `git mv` when renaming collaboration directories to preserve history.
- Avoid committing secrets. Use .gitignore for transient agent artifacts when needed.
- Add Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com> to commits made by this agent.

Contact
- This file is the authoritative summary of Copilot agent responsibilities. Keep it under source control and update when responsibilities change.
