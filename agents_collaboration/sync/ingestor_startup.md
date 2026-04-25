Ingestor startup note

This file documents how the ingestor/background fetcher service is started for local development.

Start command:
INGESTOR_PORT=4001 node ingestor/server.js &

Health endpoints:
- GET /health or /healthz -> {status: 'ok', pid, port}

Notes:
- Run in its own container or process. Configure INGESTOR_PORT to avoid conflicts with main app.
