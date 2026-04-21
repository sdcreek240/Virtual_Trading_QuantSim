import dotenv from "dotenv";
dotenv.config();

/**
 * Configuration object containing environment-specific variables.
 * Values are loaded from the system environment or a .env file.
 */
export const ENV = {
  /** The port the server will listen on. Defaults to 3000. */
  PORT: process.env.PORT || 3000,
  /** Database host address. */
  DB_HOST: process.env.DB_HOST!,
  /** Database port number. */
  DB_PORT: Number(process.env.DB_PORT),
  /** Database user. */
  DB_USER: process.env.DB_USER!,
  /** Database password. */
  DB_PASSWORD: process.env.DB_PASSWORD!,
  /** Name of the database. */
  DB_NAME: process.env.DB_NAME!,
  /** Redis cache host address. */
  REDIS_HOST: process.env.REDIS_HOST!,
  /** Redis cache port number. */
  REDIS_PORT: process.env.REDIS_PORT!
};