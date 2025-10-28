# Real-Time Chat Application

A real-time chat application built with Node.js, Express, Socket.io, and React. This application demonstrates WebSocket connections for instant messaging between multiple users.

## Features

- **Real-time messaging**: Messages appear instantly across all connected clients
- **User management**: Track connected users and display user count
- **Typing indicators**: See when other users are typing
- **Connection status**: Visual indicator of connection state
- **Responsive design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface

## Project Structure

```
├── server.js              # Node.js server with Socket.io
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── package.json       # Frontend dependencies
│   ├── public/
│   │   └── index.html     # HTML template
│   └── src/
│       ├── App.js         # Main React component
│       ├── App.css        # Styles for the chat interface
│       ├── index.js       # React entry point
│       └── index.css      # Global styles
└── README.md              # This file
```

## Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Backend Setup

1. Install backend dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The React app will run on `http://localhost:3000`

## Running Both Servers

From the root directory, you can run both servers simultaneously:

```bash
npm run dev-all
```

This will start both the backend server and the React development server.

## How to Test

1. Open your browser and go to `http://localhost:3000`
2. Enter your name and click "Join Chat"
3. Open another browser window/tab and go to the same URL
4. Enter a different name and join the chat
5. Send messages from either window - they will appear instantly in both!

## Socket.io Events

### Client to Server Events:

- `join`: User joins the chat with their username
- `sendMessage`: User sends a message
- `typing`: User typing indicator

### Server to Client Events:

- `receiveMessage`: Broadcast new message to all clients
- `userJoined`: Notify when a user joins
- `userLeft`: Notify when a user leaves
- `userCount`: Send updated user count
- `userTyping`: Broadcast typing indicators

## Technologies Used

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: React, Socket.io-client
- **Styling**: CSS3 with modern features
- **Real-time Communication**: WebSocket connections via Socket.io

## Key Learning Points

1. **WebSocket Connections**: Understanding bidirectional communication between client and server
2. **Real-time Updates**: How to update UI instantly without page refreshes
3. **Event-driven Architecture**: Using events for communication between components
4. **State Management**: Managing application state in React
5. **Socket.io Integration**: Setting up Socket.io on both client and server sides

## Troubleshooting

- Make sure both servers are running (backend on port 5000, frontend on port 3000)
- Check browser console for any connection errors
- Ensure no firewall is blocking the ports
- Try refreshing the page if messages don't appear

## Future Enhancements

- Private messaging between users
- File/image sharing
- Message history persistence
- User authentication
- Multiple chat rooms
- Emoji support
- Message reactions
