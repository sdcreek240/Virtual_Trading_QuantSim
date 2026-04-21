import { Pool } from "pg";
import { ENV } from "../config/env";

/**
 * PostgreSQL connection pool instance.
 * Using a pool is efficient for handling multiple concurrent requests
 * without needing to create a new connection for each one.
 */
export const db = new Pool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});