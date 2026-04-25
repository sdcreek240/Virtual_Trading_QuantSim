/**
 * Data required for user registration.
 */
export interface UserRegister {
    /** The user's email address. Must be unique and valid format. */
    email: string;
    /** The user's unique username. */
    username: string;
    /** The user's plain-text password. Will be hashed before storage. */
    password: string;
}

/**
 * Successful registration response data.
 */
export interface RegisterSuccess {
    success: true;
    /** HTTP status code for the response. */
    statusCode: number;
    /** The unique identifier for the newly created user. */
    userId: string;
    /** The registered email address. */
    email: string;
}

/**
 * Error response data for registration failures.
 */
export interface RegisterError {
    success: false;
    /** HTTP status code for the error response. */
    statusCode: number;
    /** Human-readable error message. */
    error: string;
}

/**
 * Discriminated union for registration responses.
 */
export type RegisterResponse = RegisterSuccess | RegisterError;

/**
 * Structure for individual validation errors.
 */
export interface ValidationError {
    /** The field that failed validation. */
    field: string;
    /** Detailed message explaining why validation failed. */
    message: string;
}

/**
 * Utility class for user-related data validation.
 */
export class UserValidation {
    
    /**
     * Validates user registration data.
     * @param data - The registration data to validate.
     * @returns Object containing validation status and any error messages.
     */
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
    }

    /**
     * Validates user login credentials.
     * @param data - The login data to validate.
     * @returns Object containing validation status and any error messages.
     */
    static validateLogin(data: UserLogin): { isValid: boolean; errors: ValidationError[] } {
        const errors: ValidationError[] = [];

        if (!data.email && !data.username) {
            errors.push({ field: "identifier", message: "Either email or username is required" });
        }

        // Email validation (only if provided)
        if (data.email && data.email.length > 0) {
            const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
            if (!emailRegex.test(data.email)) {
                errors.push({ field: "email", message: "Invalid email format" });
            }
            if (data.email.length > 255) {
                errors.push({ field: "email", message: "Email must be less than 255 characters" });
            }
        }

        // Username validation (only if provided)
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
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

/**
 * Credentials for user authentication.
 */
export interface UserLogin {
    /** Optional email identifier for login. */
    email?: string;
    /** Optional username identifier for login. */
    username?: string;
    /** Required password for authentication. */
    password: string;
}

/**
 * Successful login response data containing authentication tokens.
 */
export interface LoginSuccess {
    success: true;
    /** HTTP status code for the response. */
    statusCode: number;
    /** The authenticated user's unique identifier. */
    userId: string;
    /** The user's email address. */
    email: string;
    /** The user's username. */
    username: string;
    /** JWT access token for authorized requests. */
    accessToken: string;
    /** JWT refresh token for obtaining new access tokens. */
    refreshToken: string;
}

/**
 * Error response data for login failures.
 */
export interface LoginError {
    success: false;
    /** HTTP status code for the error response. */
    statusCode: number;
    /** Human-readable error message. */
    error: string;
}

/**
 * Discriminated union for login responses.
 */
export type LoginResponse = LoginSuccess | LoginError;







