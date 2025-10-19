# Account Transfer System with Balance Validation

A Node.js and Express.js application with MongoDB database to simulate a bank account transfer system. This system implements secure money transfer API with balance validation without using database transactions.

## Features

- Create sample user accounts with initial balances
- Transfer money between accounts with balance validation
- Proper error handling for insufficient funds and invalid accounts
- Sequential updates ensuring logical correctness
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Start the server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

### 1. Create Sample Users

- **POST** `/create-users`
- **Description**: Creates sample users (Alice with $1000, Bob with $500)
- **Response**: List of created users with their IDs

### 2. Transfer Money

- **POST** `/transfer`
- **Body**:
  ```json
  {
    "fromUserId": "user_id_here",
    "toUserId": "user_id_here",
    "amount": 150
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Transferred $150 from Alice to Bob",
    "senderBalance": 850,
    "receiverBalance": 650
  }
  ```
- **Error Responses**:
  - 400: Insufficient balance
  - 404: Account not found
  - 400: Invalid input

### 3. Get All Users

- **GET** `/users`
- **Description**: Retrieves all users and their current balances

### 4. Health Check

- **GET** `/health`
- **Description**: Server status check

## Testing the API

### Step 1: Create Sample Users

```bash
curl -X POST http://localhost:3000/create-users
```

### Step 2: Get Users (to see their IDs)

```bash
curl -X GET http://localhost:3000/users
```

### Step 3: Transfer Money (Successful)

```bash
curl -X POST http://localhost:3000/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromUserId": "USER_ID_FROM_STEP_2",
    "toUserId": "USER_ID_FROM_STEP_2",
    "amount": 150
  }'
```

### Step 4: Try Insufficient Balance Transfer

```bash
curl -X POST http://localhost:3000/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromUserId": "USER_ID_FROM_STEP_2",
    "toUserId": "USER_ID_FROM_STEP_2",
    "amount": 900
  }'
```

## Key Implementation Details

1. **Balance Validation**: Before any transfer, the system checks if the sender has sufficient balance
2. **Sequential Updates**: Updates are performed sequentially (sender first, then receiver) to maintain consistency
3. **Error Handling**: Comprehensive error handling for various scenarios
4. **Input Validation**: Validates all input parameters before processing
5. **No Database Transactions**: Uses application-level logic to ensure data consistency

## Project Structure

```
├── server.js          # Main server file
├── models/
│   └── User.js        # User model/schema
├── config.js          # Configuration
├── package.json       # Dependencies
└── README.md          # This file
```

## Error Scenarios Handled

- Insufficient balance
- Account not found
- Invalid amount (negative or zero)
- Transferring to same account
- Missing required fields
- Database connection errors
