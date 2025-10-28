const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store connected users
const connectedUsers = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on('join', (username) => {
    connectedUsers.set(socket.id, username);
    console.log(`${username} joined the chat`);
    
    // Notify all clients about new user
    socket.broadcast.emit('userJoined', {
      username: username,
      message: `${username} joined the chat`,
      timestamp: new Date().toLocaleTimeString()
    });

    // Send current user count to all clients
    io.emit('userCount', connectedUsers.size);
  });

  // Handle incoming messages
  socket.on('sendMessage', (data) => {
    const username = connectedUsers.get(socket.id);
    if (username) {
      const messageData = {
        username: username,
        message: data.message,
        timestamp: new Date().toLocaleTimeString(),
        id: socket.id
      };
      
      console.log(`Message from ${username}: ${data.message}`);
      
      // Broadcast message to all connected clients
      io.emit('receiveMessage', messageData);
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const username = connectedUsers.get(socket.id);
    if (username) {
      socket.broadcast.emit('userTyping', {
        username: username,
        isTyping: data.isTyping
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = connectedUsers.get(socket.id);
    if (username) {
      console.log(`${username} left the chat`);
      
      // Notify all clients about user leaving
      socket.broadcast.emit('userLeft', {
        username: username,
        message: `${username} left the chat`,
        timestamp: new Date().toLocaleTimeString()
      });

      // Remove user from connected users
      connectedUsers.delete(socket.id);
      
      // Send updated user count to all clients
      io.emit('userCount', connectedUsers.size);
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Real-time Chat Server is running!',
    connectedUsers: connectedUsers.size
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io server is ready for connections`);
});
