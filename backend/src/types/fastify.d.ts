import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwtVerify(): Promise<void>;
    user: {
      sub: string;
      role?: string;
      iat?: number;
      exp?: number;
    };
  }

  interface FastifyInstance {
    jwt: JWT;
  }
}