import { InternalEventTargetEventProperties } from "node:events";

export interface userRegister {

    email: string;
    username: string;
    password: string;
}//userRegister

export interface RegisterSuccess {
    success: true;
    statusCode: number;
    userId: string;
    email: string;
}

export interface RegisterError {
    success: false;
    statusCode: number;
    error: string;
}

export type RegisterResponse = RegisterSuccess | RegisterError;//RegisterResponse

export interface ValidationError {
    field: string;
    message: string;
}//ValidationError

export class UserValidation {
    
    static validateRegistration(data: {
        email: string;
        username: string;
        password: string;
    }): { isValid: boolean; errors: ValidationError[] } {
        
        const errors: ValidationError[] = [];

        // Email validation
        if (!data.email) {
            errors.push({ field: "email", message: "Email is required" });
        } else {

            const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

            if (!emailRegex.test(data.email)) {
                errors.push({ field: "email", message: "Invalid email format" });
            }

            if (data.email.length > 255) {
                errors.push({ field: "email", message: "Email must be less than 255 characters" });
            }
        }

        // Username validation
        if (!data.username) {
            errors.push({ field: "username", message: "Username is required" });
        } else {
            if (data.username.length < 3) {
                errors.push({ field: "username", message: "Username must be at least 3 characters long" });
            }
            if (data.username.length > 50) {
                errors.push({ field: "username", message: "Username must be less than 50 characters" });
            }
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(data.username)) {
                errors.push({ field: "username", message: "Username can only contain letters, numbers, and underscores" });
            }
        }

        // Password validation
        if (!data.password) {
            errors.push({ field: "password", message: "Password is required" });
        } else {
            if (data.password.length < 8) {
                errors.push({ field: "password", message: "Password must be at least 8 characters long" });
            }
            if (data.password.length > 100) {
                errors.push({ field: "password", message: "Password must be less than 100 characters" });
            }
            
            const hasUpperCase = /[A-Z]/.test(data.password);
            const hasLowerCase = /[a-z]/.test(data.password);
            const hasNumbers = /\d/.test(data.password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
            
            if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
                errors.push({ 
                    field: "password", 
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" 
                });
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }//validateRegistration

    static validateLogin(data: userLogin): { isValid: boolean; errors: ValidationError[] } {

        const errors: ValidationError[] = [];


        if (!data.email) { errors.push({ field: "email", message: "Email is required" }); }

        if (!data.username) {errors.push({field: "username", message: "Username required"});}

        //Email val
        if (data.email && data.email.length > 0) {
            const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
            if (!emailRegex.test(data.email)) {
                errors.push({ field: "email", message: "Invalid email format" });
            }
            if (data.email.length > 255) {
                errors.push({ field: "email", message: "Email must be less than 255 characters" });
            }
        }

        //Username validation
        if (data.username && data.username.length > 0) {
            if (data.username.length < 3) {
                errors.push({ field: "username", message: "Username must be at least 3 characters long" });
            }
            if (data.username.length > 50) {
                errors.push({ field: "username", message: "Username must be less than 50 characters" });
            }
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(data.username)) {
                errors.push({ 
                    field: "username", 
                    message: "Username can only contain letters, numbers, and underscores" 
                });
            }
        }
        
        // Password validation
        if (!data.password) {
            errors.push({ field: "password", message: "Password is required" });
        } else if (data.password.length < 1) {
            errors.push({ field: "password", message: "Password cannot be empty" });
        }

        return {
            isValid: errors.length===0,
            errors
        }
    }//validateLogin
}//UserValidation

export interface userLogin {
    email?: string;
    username?: string;
    password: string;
}

export interface LoginSuccess {
    success: true;
    statusCode: number;
    userId: string;
    email: string;
    username: string;
    accessToken: string;
    refreshToken: string;
}

export interface LoginError {
    success: false;
    statusCode: number;
    error: string;
}

export type loginResponse = LoginSuccess | LoginError;






