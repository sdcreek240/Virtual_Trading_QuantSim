import { appendFile } from "node:fs";
import { prisma } from "../lib/prisma";
import { UserRegister, RegisterResponse, UserLogin, LoginResponse } from "../types/user.type";
import { hashPassword, comparePassword } from "../lib/auth";
import { FastifyInstance } from 'fastify';

/**
 * Service handling user-related business logic such as registration and authentication.
 */
export class UserService {

    private fastify: FastifyInstance;

    /**
     * Initializes the UserService with a Fastify instance for accessing plugins (e.g., JWT).
     * @param fastify - The Fastify application instance.
     */
    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
    }

    /**
     * Registers a new user in the system.
     * Checks for existing users with the same email or username before creation.
     * @param fields - The user registration data.
     * @returns A promise resolving to a RegisterResponse indicating success or failure.
     */
    async registerUser(fields: UserRegister): Promise<RegisterResponse> {

        const { email, username, password } = fields;

        //Check for dup user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {email: email},
                    {username: username}
                ]
            }
        });


        if (existingUser) {

            if (existingUser.email===email) {
                return {
                    success: false,
                    statusCode: 409,
                    error: "email already exists"
                };
            }//email

            if (existingUser.username===username) {
                return {
                    success: false,
                    statusCode: 409,
                    error: "username already exists"
                };
            }
        }
        //END existing user validation

        //hash password
        const hPassword = await hashPassword(password);

        //Create new user
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash: hPassword
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true
            }
        });

        return {
            success: true,
            statusCode: 201, // Created
            userId: newUser.id,
            email: newUser.email
        }
    }//END_registerUser

    /**
     * Authenticates a user using their email or username and password.
     * Generates JWT access and refresh tokens upon successful authentication.
     * @param identifier - The user's email or username.
     * @param password - The user's plain-text password.
     * @returns A promise resolving to a LoginResponse containing user data and tokens.
     */
    async loginUser(identifier: string, password: string): Promise<LoginResponse> {

        //find user
        const user = await prisma.user.findFirst({
            where : {
                OR: [
                    {email: identifier},
                    {username: identifier}
                ]
            }
        });

        //user doesnt exists
        if (!user) {
            return {
                success: false,
                statusCode: 401,
                error: `User not found with identifier: ${identifier}`
            }
        }

        //Validate password
        const isPasswordValid = await comparePassword(password, user.passwordHash);

        if (!isPasswordValid) {

            return {
                success: false,
                statusCode: 401,
                error: "Password isn't right nhe"
            }
        }

        //JWT authentication
        const accessToken = this.fastify.jwt.sign(
            {
                userId: user.id,
                email: user.email,
                username: user.username
            },
            {expiresIn: process.env.JWT_ACCESS_EXPIRES_IN}
        );

        const refreshToken = this.fastify.jwt.sign(
                {userId: user.id},
                {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
        );

        await prisma.user.update({
            where: {id: user.id},
            data: {lastLoginAt: new Date()}
        })

        return {
            success: true,
            statusCode: 200,
            userId: user.id,
            email: user.email,
            username: user.username,
            accessToken: accessToken,
            refreshToken: refreshToken
        }

    }//loginUser
}