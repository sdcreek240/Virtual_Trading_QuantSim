import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/users.service";
import { userRegister, UserValidation, userLogin } from "../types/user.type";

const userService = new UserService();

export class UserController {

    async registerUser(request: FastifyRequest<{ Body: userRegister }>, reply: FastifyReply){

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

            const result = await userService.registerUser({ email, username, password });

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

    async loginUser(request: FastifyRequest<{Body: userLogin}>, reply: FastifyReply){

        try {

            const {email, username, password} = request.body;

            const identifier = email || username;

            if (!identifier) {
                return reply.status(400).send({
                    success: false,
                    error: "email or username required"
                });
            }//Check for username or email presence

            const result = userService.loginUser({identifier, password});




        } catch (error) {


        }
    }//loginUser


}//UserController
