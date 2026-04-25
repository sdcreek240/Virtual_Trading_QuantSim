MVP Backend Endpoints — Short Todo

Goal:
Implement minimal backend endpoints to CRUD and query market data so frontend and fetcher can interact.

Tasks:
- Implement CRUD endpoints for ticks, ohlc, and symbols (GET/POST/GET by id/DELETE).
- Add health / metrics endpoints for the fetcher and API.
- Add input validation and basic tests for each endpoint.
- Ensure separate DB connection pool and config for background fetcher.
- After tests pass, build adapter to ingest live data and integrate with frontend.

Next: Mark as in-progress in session todos when ready to implement.