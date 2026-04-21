import Redis from "ioredis";
import { ENV } from "../config/env";

/**
 * Redis client instance for caching and real-time state management.
 * Provides fast access to frequently used data.
 */
export const redis = new Redis({
  host: ENV.REDIS_HOST,
  port: Number(ENV.REDIS_PORT),
});