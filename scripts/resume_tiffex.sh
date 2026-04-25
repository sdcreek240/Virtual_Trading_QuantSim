#!/usr/bin/env bash
# Print the TiffEx snapshot and list priority files
set -euo pipefail
SNAP=agents_collaboration/sync/TiffEx_snapshot.md
if [ -f "$SNAP" ]; then
  echo "--- TiffEx Snapshot ---"
  sed -n '1,200p' "$SNAP"
  echo "--- End Snapshot ---\n"
else
  echo "No snapshot found at $SNAP"
fi

echo "Priority files:"
ls -1 agents_collaboration/ agents_collaboration/plans agents_collaboration/sync || true

echo "To regenerate snapshot: ./scripts/generate_tiffex_snapshot.sh"
