import { prisma } from "../lib/prisma";
import { userRegister, RegisterResponse } from "../types/user.type";


export class UserService {

    async registerUser(fields: userRegister): Promise<RegisterResponse> {

        return {
            userId: "test",
            email: "testEmail"
        };
    }//END_registerUser
}