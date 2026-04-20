# Auth API Contract

Endpoints for user authentication and session management.

## POST `/auth/register`
Creates a new user account.

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

## POST `/auth/login`
Authenticates a user and returns JWT access and refresh tokens.

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

## GET `/auth/protected`
A sample protected route to verify JWT authentication.

**Headers:**
`Authorization: Bearer <accessToken>`

**Response (200 OK):**
```json
{
  "message": "Protected data"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```
