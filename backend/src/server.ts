import Fastify from "fastify";

const app = Fastify();

app.get("/health", async () => { return { status: "ok" }; });

const start = async () => {

  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running on port 3000");
  } catch (err) {
    process.exit(1);
  }
};

start();