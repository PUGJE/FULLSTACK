# JWT Banking API

A secure banking API built with Express.js and JWT authentication. This API demonstrates how to implement secure authentication for sensitive banking operations.

## Features

- 🔐 JWT-based authentication
- 💰 Account balance checking
- 💳 Money deposit functionality
- 💸 Money withdrawal with balance validation
- 🛡️ Protected routes with middleware
- ⚠️ Comprehensive error handling

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the server:

   ```bash
   npm start
   ```

   Or for development with auto-restart:

   ```bash
   npm run dev
   ```

2. The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST /login

Login with username and password to get a JWT token.

**Request Body:**

```json
{
  "username": "user1",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Endpoints (Require JWT Token)

All protected endpoints require the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### GET /balance

Get the current account balance.

**Response:**

```json
{
  "balance": 1000
}
```

#### POST /deposit

Deposit money into the account.

**Request Body:**

```json
{
  "amount": 250
}
```

**Response:**

```json
{
  "message": "Deposited $250",
  "newBalance": 1250
}
```

#### POST /withdraw

Withdraw money from the account.

**Request Body:**

```json
{
  "amount": 150
}
```

**Response:**

```json
{
  "message": "Withdrew $150",
  "newBalance": 1100
}
```

## Testing the API

### Using the Test Script

Run the included test script to see the API in action:

```bash
node test-api.js
```

### Using Postman/Insomnia

1. **Login**: Send a POST request to `/login` with the credentials
2. **Copy the token** from the response
3. **Set Authorization header**: Add `Authorization: Bearer <token>` to all protected requests
4. **Test protected endpoints**: Use the token to access `/balance`, `/deposit`, and `/withdraw`

### Test Credentials

- **Username**: `user1`
- **Password**: `password123`

## Error Handling

The API handles various error scenarios:

- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Invalid or expired token
- **400 Bad Request**: Invalid input (e.g., negative amounts, insufficient balance)
- **404 Not Found**: Invalid endpoint

## Security Features

- JWT tokens with expiration (1 hour)
- Password hashing with bcrypt
- Protected routes with middleware
- Input validation
- Comprehensive error handling

## Project Structure

```
├── server.js          # Main server file
├── test-api.js        # Test script
├── package.json       # Dependencies
└── README.md          # This file
```

## Development Notes

- This is a demo application using in-memory storage
- In production, use a proper database
- Store JWT secrets in environment variables
- Implement proper user management
- Add rate limiting and additional security measures
