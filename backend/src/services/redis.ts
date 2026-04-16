import Redis from "ioredis";
import { ENV } from "../config/env";

export const redis = new Redis({
  host: ENV.REDIS_HOST,
  port: Number(ENV.REDIS_PORT),
});