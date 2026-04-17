import "dotenv/config";
import { defineConfig } from "prisma/config";

declare const process: {
  env: {
    DATABASE_URL?: string;
  };
};

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});