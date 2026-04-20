import "dotenv/config";

import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { initWebSocket } from "./websocket/server";
import { prisma } from "./lib/prisma";
import { authRoutes } from "./routes/auth";

const app = Fastify({ logger: false });


// Auth middleware as a simple function (not decorated)
async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: "Unauthorized" });
    throw err;
  }
}

type DbInfoResult = {
  database_name: string;
  user: string;
  server_address: string | null;
  server_port: number | null;
};

/**
 * Health check endpoint to verify server and database connectivity.
 */
app.get("/health", async () => {
  const startTime = Date.now();
  let dbStatus = "disconnected";
  let dbLatency = null;
  let dbDetails = {};

  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1 as connected`;
    dbLatency = Date.now() - dbStart;
    dbStatus = "connected";
    
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
    dbDetails = { error: error instanceof Error ? error.message : "Unknown error" };
  }

  return {
    status: dbStatus === "connected" ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    responseTime: `${Date.now() - startTime}ms`,
    database: { status: dbStatus, latency: dbLatency ? `${dbLatency}ms` : null, ...dbDetails },
    services: { websocket: "ready", http: "running" }
  };
});

app.get("/favicon.ico", async (req, reply) => reply.status(204).send());
app.get("/", async () => ({ message: "QuantSim Trading API is running" }));

// Register JWT plugin
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  sign: { expiresIn: "15m" },
});

// Register auth routes with prefix
app.register(authRoutes, { prefix: "/auth" });

/**
 * Initializes and starts the Fastify server.
 */
const start = async () => {
  try {
    const port = 3000;
    const host = "0.0.0.0";

    await app.listen({ port, host });
    initWebSocket(app.server);

    console.log(`\n🚀 QuantSim backend running at http://${host}:${port}`);
    console.log(`📊 Health check: http://${host}:${port}/health`);
    console.log(`🔌 WebSocket ready: ws://${host}:${port}\n`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();