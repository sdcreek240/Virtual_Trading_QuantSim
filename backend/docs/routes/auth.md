# Auth API Contract

Endpoints for user authentication and session management.

## POST `/user/register`
Creates a new user account. This endpoint is public and does not require authentication.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "trader1",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User: trader1 registered successfully",
  "userId": "clvp..."
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    { "field": "password", "message": "Password must be at least 8 characters long" }
  ]
}
```

**Response (409 Conflict):**
```json
{
  "success": false,
  "error": "email already exists"
}
```

## POST `/user/login`
Authenticates a user and returns JWT access and refresh tokens. This endpoint is public and does not require authentication.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```
OR
```json
{
  "username": "trader1",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "userId": "clvp...",
  "email": "user@example.com",
  "username": "trader1",
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "User not found with identifier: user@example.com"
}
```

## GET `/user/protected` (Example)
A sample protected route to verify JWT authentication.

**Headers:**
`Authorization: Bearer <accessToken>`

**Response (200 OK):**
```json
{
  "message": "Protected data"
}
```

---

# How Authentication Works

Our backend uses a **JWT-based (JSON Web Token)** authentication system to manage secure access to resources without storing session state on the server (stateless).

### 1. The Authentication Flow
- **Registration**: When a user registers, their password is encrypted using **Bcrypt** (salt rounds: 10) before being stored in the PostgreSQL database.
- **Login**: The user provides credentials (email/username + password). The backend verifies the password hash.
- **Token Issue**: Upon success, the server generates two tokens:
  - **Access Token (15m)**: Used for every subsequent request to protected routes.
  - **Refresh Token (7d)**: Used to obtain a new access token when it expires.
- **Verification**: For protected routes, the `authenticate` middleware uses `@fastify/jwt` to verify the token in the `Authorization` header.

### 2. User Roles
The system supports two primary roles via the `UserRole` enum:
- **`USER` (Default)**: Standard permissions for trading and portfolio management.
- **`ADMIN`**: Elevated permissions for system management and monitoring.
*Roles are stored in the database and can be included in the JWT payload for client-side permission checks or verified on the server-side via middleware.*

### 3. Behind the Scenes (Background Logic)
- **Security**: Passwords are never stored in plain text. Hashing happens in the `UserService` before any DB interaction.
- **Statelessness**: The server doesn't "remember" you; it only trusts the signed JWT. If the token is valid, you are authenticated.
- **Tracking**: Every successful login updates the `lastLoginAt` field in the database to track user activity.
- **Validation**: Every request body is validated against a schema (Zod/Joi style) before processing to ensure data integrity.
