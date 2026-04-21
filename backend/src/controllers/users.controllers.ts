import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/users.service";
import { UserRegister, UserValidation, UserLogin } from "../types/user.type";

/**
 * Controller handling HTTP requests related to user management.
 */
export class UserController {
    private userService: UserService;

    /**
     * Initializes the UserController with a UserService.
     * @param fastify - The Fastify application instance.
     */
    constructor(fastify: FastifyInstance) {
        this.userService = new UserService(fastify);
    }

    /**
     * Handles user registration requests.
     * @param request - The Fastify request containing registration data in the body.
     * @param reply - The Fastify reply object.
     * @returns A promise that resolves to the HTTP response.
     */
    async registerUser(request: FastifyRequest<{ Body: UserRegister }>, reply: FastifyReply){

        try {

            const { email, username, password } = request.body;

            //Validation
            const validation = UserValidation.validateRegistration({email, username, password});

            if (!validation.isValid){
                return reply.status(400).send({
                    success: false,
                    error: "Validation failed",
                    details: validation.errors
                });
            }
            //END_validation

            const result = await this.userService.registerUser({ email, username, password });

            if (!result.success) {

                return reply.status(result.statusCode || 400).send({
                    success: false,
                    error: result.error
                });
            }

            return reply.status(201).send({
                success: true,
                message: `User: ${username} registered successfully`,
                userId: result.userId
            });

        } catch (error) {
            return reply.status(500).send({ 
                success: false,
                error: error instanceof Error ? error.message : "Unknown error" 
            });
        }
    }//registerUser

    /**
     * Handles user login requests.
     * @param request - The Fastify request containing login credentials in the body.
     * @param reply - The Fastify reply object.
     * @returns A promise that resolves to the HTTP response.
     */
    async loginUser(request: FastifyRequest<{Body: UserLogin}>, reply: FastifyReply){

        try {

            const {email, username, password} = request.body;

            const validation = UserValidation.validateLogin({ email, username, password });
        
            if (!validation.isValid) {
                return reply.status(400).send({
                    success: false,
                    error: "Validation failed",
                    details: validation.errors
                });
            }

            const identifier = email || username;

            const result = await this.userService.loginUser(identifier!, password);

            if (!result.success) {
                return reply.status(result.statusCode).send({
                    success: false,
                    error: result.error
                });
            }

            return reply.status(200).send({
                success: true,
                userId: result.userId,
                email: result.email,
                username: result.username,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        } catch (error) {

            console.error("Login error:", error);
            return reply.status(500).send({
                success: false,
                error: error instanceof Error ? error.message : "Internal server error"
            });
        }
    }//loginUser


}//UserController
