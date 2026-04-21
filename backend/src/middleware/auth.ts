import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Middleware function to authenticate requests using JWT.
 * Verifies the token provided in the Authorization header.
 * 
 * @param request - The incoming Fastify request.
 * @param reply - The Fastify reply object used for error handling.
 */
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: "Unauthorized" });
  }
}