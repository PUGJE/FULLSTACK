const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Routes

// Create sample users endpoint
app.post('/create-users', async (req, res) => {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Create sample users
    const users = await User.create([
      { name: 'Alice', balance: 1000 },
      { name: 'Bob', balance: 500 }
    ]);
    
    res.status(201).json({
      message: 'Users created',
      users: users
    });
  } catch (error) {
    console.error('Error creating users:', error);
    res.status(500).json({
      message: 'Error creating users',
      error: error.message
    });
  }
});

// Transfer money endpoint
app.post('/transfer', async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;
    
    // Validate input
    if (!fromUserId || !toUserId || !amount) {
      return res.status(400).json({
        message: 'Missing required fields: fromUserId, toUserId, and amount are required'
      });
    }
    
    if (amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be greater than 0'
      });
    }
    
    if (fromUserId === toUserId) {
      return res.status(400).json({
        message: 'Cannot transfer to the same account'
      });
    }
    
    // Find both users
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);
    
    if (!fromUser) {
      return res.status(404).json({
        message: 'Sender account not found'
      });
    }
    
    if (!toUser) {
      return res.status(404).json({
        message: 'Receiver account not found'
      });
    }
    
    // Check if sender has sufficient balance
    if (fromUser.balance < amount) {
      return res.status(400).json({
        message: 'Insufficient balance'
      });
    }
    
    // Perform the transfer (sequential updates without transactions)
    fromUser.balance -= amount;
    toUser.balance += amount;
    
    // Save both users
    await fromUser.save();
    await toUser.save();
    
    res.status(200).json({
      message: `Transferred $${amount} from ${fromUser.name} to ${toUser.name}`,
      senderBalance: fromUser.balance,
      receiverBalance: toUser.balance
    });
    
  } catch (error) {
    console.error('Error during transfer:', error);
    res.status(500).json({
      message: 'Error processing transfer',
      error: error.message
    });
  }
});

// Get all users endpoint
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: 'Users retrieved successfully',
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  console.log(`Health check: http://localhost:${config.PORT}/health`);
  console.log(`Create users: POST http://localhost:${config.PORT}/create-users`);
  console.log(`Transfer money: POST http://localhost:${config.PORT}/transfer`);
  console.log(`Get users: GET http://localhost:${config.PORT}/users`);
});
