import { appendFile } from "node:fs";
import { prisma } from "../lib/prisma";
import { userRegister, RegisterResponse, userLogin, loginResponse } from "../types/user.type";
import { hashPassword, comparePassword } from "../lib/auth";
import { FastifyInstance } from 'fastify';

export class UserService {

    private fastify: FastifyInstance;

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
    }

    async registerUser(fields: userRegister): Promise<RegisterResponse> {

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

    async loginUser(identifier: string, password: string): Promise<loginResponse> {

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