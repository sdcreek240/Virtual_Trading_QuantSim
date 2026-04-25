#!/usr/bin/env bash
# Build and run ingestor container locally for testing. Maps host port -> container 4001.
set -euo pipefail
HOST_PORT=${1:-${INGESTOR_HOST_PORT:-4002}}
IMAGE_TAG=vt_ingestor:local

# Build image
docker build -f docker/Dockerfile.ingestor -t ${IMAGE_TAG} .

# Remove existing container if exists
if docker ps -a --format '{{.Names}}' | grep -q '^vt_ingestor_local$'; then
  docker rm -f vt_ingestor_local || true
fi

# Run container
docker run -d --name vt_ingestor_local -p ${HOST_PORT}:4001 ${IMAGE_TAG}

echo "Ingestor container started and mapped to host port ${HOST_PORT}" 
