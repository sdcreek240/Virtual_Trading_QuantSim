import {prisma} from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth";
import { UserController } from "../controllers/users.controllers";

const userController = new UserController();

export async function authRoutes(app: FastifyInstance) {

    app.get("/protected", { preHandler: authenticate }, async () => {
        return { message: "Protected data" };
    });

    app.post("/register", userController.registerUser);

    app.post("/login", userController.loginUser);
}//END_usersRoutes