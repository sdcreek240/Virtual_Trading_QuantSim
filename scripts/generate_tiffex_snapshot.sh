#!/usr/bin/env bash
# Regenerate TiffEx snapshot from key project files. Overwrites agents_collaboration/sync/TiffEx_snapshot.md
set -euo pipefail
OUT=agents_collaboration/sync/TiffEx_snapshot.md
TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)
{
  echo "TiffEx Snapshot — Copilot Agent Context"
  echo "Timestamp: $TS"
  echo
  echo "Core context (auto-generated)"
  echo
  echo "--- PROJECT_CONTEXT.md ---"
  sed -n '1,200p' agents_collaboration/PROJECT_CONTEXT.md || true
  echo
  echo "--- ERD.md ---"
  sed -n '1,200p' agents_collaboration/ERD.md || true
  echo
  echo "--- COPILOT.md (excerpt) ---"
  sed -n '1,200p' COPILOT.md || true
  echo
  echo "--- Open todos (please update manually if needed) ---"
  echo "Use the session SQL 'todos' table for authoritative tracking."
} > "$OUT"

echo "Snapshot regenerated to $OUT"
