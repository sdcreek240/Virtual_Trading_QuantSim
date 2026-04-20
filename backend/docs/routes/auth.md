# Auth API Contract

## POST `/auth/register`
Creates a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "trader1",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "cuid",
    "email": "user@example.com",
    "username": "trader1",
    "balance": "100000.00"
  },
  "token": "jwt_token_here"
}
```

## POST `/auth/login`
Authenticates a user and returns a token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "cuid",
    "email": "user@example.com",
    "username": "trader1",
    "lastLoginAt": "2026-04-20T17:31:28.436Z"
  },
  "token": "jwt_token_here"
}
```
