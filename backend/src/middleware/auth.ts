import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}

// Optional: Role-based middleware
export function requireRole(role: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await authenticate(request, reply);
    const user = request.user as { role: string };
    if (user.role !== role && user.role !== "ADMIN") {
      return reply.status(403).send({ error: "Forbidden" });
    }
  };
}