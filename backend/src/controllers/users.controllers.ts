import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/users.service";

const userService = new UserService();

export class UserController {

    async registerUser(request: FastifyRequest, reply: FastifyReply){

        try {
            
        } catch (error) {
            return reply.status(500).send({ 
                error: error instanceof Error ? error.message : "Unknown error" 
            });
        }
    }
}
