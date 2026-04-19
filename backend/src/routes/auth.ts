import {prisma} from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {

    app.get("/users", async () => {return await prisma.user.findMany();});
}//END_usersRoutes