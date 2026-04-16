import Fastify from "fastify";
import {initWebSocket} from "./websocket/server";

const app = Fastify({
//   logger: true  // Enable built-in logging
});

app.get("/favicon.ico", async (req, reply) => { reply.status(204).send(); });

app.get("/health", async () => { return { status: "ok", timestamp: new Date().toISOString() }; });

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