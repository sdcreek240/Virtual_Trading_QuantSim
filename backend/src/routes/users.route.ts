import { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth";
import { UserController } from "../controllers/users.controllers";

/**
 * Registers authentication-related routes to the Fastify instance.
 * Includes routes for user registration, login, and a sample protected route.
 * 
 * @param app - The Fastify instance to register routes on.
 */
export async function userRoutes(app: FastifyInstance) {

    const userController = new UserController(app);

    /**
     * Sample protected route to verify authentication.
     * Requires a valid JWT token in the Authorization header.
     */
    // app.get("/protected", { preHandler: authenticate }, async () => {
    //     return { message: "Protected data" };
    // });

    /**
     * Route for new user registration.
     */
    app.post("/register", userController.registerUser.bind(userController));

    /**
     * Route for user authentication (login).
     */
    app.post("/login", userController.loginUser.bind(userController));
}//END_userRoutes