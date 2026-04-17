import "dotenv/config";

import Fastify from "fastify";
import { initWebSocket } from "./websocket/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app = Fastify({
//   logger: true  // Enable built-in logging
});

type DbInfoResult = {
  database_name: string;
  user: string;
  server_address: string | null;
  server_port: number | null;
};

app.get("/health", async () => {
  const startTime = Date.now();
  let dbStatus = "disconnected";
  let dbLatency = null;
  let dbDetails = {};

  try {
    // Test database connection with a simple query
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1 as connected, current_database() as db_name, current_user as db_user, version() as db_version`;
    dbLatency = Date.now() - dbStart;
    dbStatus = "connected";
    
    // Get detailed database info
    const dbInfo = await prisma.$queryRaw<DbInfoResult[]>`
      SELECT 
        current_database() as database_name,
        current_user as user,
        inet_server_addr() as server_address,
        inet_server_port() as server_port
    `;
    
    dbDetails = dbInfo[0] || {};
  } catch (error) {
    dbStatus = "disconnected";

    if (error instanceof Error) {
      dbDetails = { error: error.message };
    } else {
      dbDetails = { error: "Unknown database error" };
    }
  }

  const responseTime = Date.now() - startTime;

  return {
    status: dbStatus === "connected" ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    responseTime: `${responseTime}ms`,
    database: {
      status: dbStatus,
      latency: dbLatency ? `${dbLatency}ms` : null,
      ...dbDetails
    },
    services: {
      websocket: "ready",
      http: "running"
    }
  };
});

app.get("/favicon.ico", async (req, reply) => { reply.status(204).send(); });

app.get("/", async () => { return { message: "QuantSim Trading API is running" }; });

const start = async () => {
  try {
    const port = 3000;
    const host = "0.0.0.0";

    const server = await app.listen({ port: port, host: host});
    initWebSocket(app.server);    

    console.log(`🚀 QuantSim backend running at http://${host}:${port}`);
    console.log(`📊 Health check: http://${host}:${port}/health`);
    console.log(`🔌 WebSocket ready: ws://${host}:${port}`);
    
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();