#!/usr/bin/env bash
set -euo pipefail

# Find a free host port starting at $1 (default 4001)
port_in_use(){ ss -ltn "(sport = :$1)" 2>/dev/null | grep -q LISTEN || return 1; }
find_free_port(){ local p=${1:-4001}; while port_in_use "$p"; do p=$((p+1)); done; echo "$p"; }

INGESTOR_PORT=$(find_free_port 4001)
# Ensure WS port not same as INGESTOR_PORT
WS_START=4002
if [ "$INGESTOR_PORT" -ge "$WS_START" ]; then WS_START=$((INGESTOR_PORT+1)); fi
INGESTOR_WS_PORT=$(find_free_port $WS_START)

export INGESTOR_HOST_PORT=$INGESTOR_PORT
export INGESTOR_WS_HOST_PORT=$INGESTOR_WS_PORT

echo "Using host ports: INGESTOR_HOST_PORT=$INGESTOR_HOST_PORT -> container:4001, INGESTOR_WS_HOST_PORT=$INGESTOR_WS_HOST_PORT -> container:4002"

# Run docker compose build and up with these env vars
docker compose -f docker/docker-compose.yml build --no-cache ingestor
# Start whole stack (db/backend/redis/ingestor)
docker compose -f docker/docker-compose.yml up -d

echo "Services starting. Check logs with: docker compose -f docker/docker-compose.yml logs -f ingestor"