const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-change-in-production'; // In production, use environment variables

// Middleware
app.use(express.json());

// In-memory storage for demo purposes
// In production, use a proper database
let accounts = {
    'user1': {
        username: 'user1',
        password: '$2a$10$LMNJnhGBAUGfBLprckAWTumGJTV7SAPn0hPsMUG6fSmEVInhE9XCq', // password123
        balance: 1000
    }
};

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = accounts[username];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected routes

// Get account balance
app.get('/balance', authenticateToken, (req, res) => {
    const user = accounts[req.user.username];
    res.json({ balance: user.balance });
});

// Deposit money
app.post('/deposit', authenticateToken, (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Valid amount is required' });
        }

        const user = accounts[req.user.username];
        user.balance += amount;

        res.json({
            message: `Deposited $${amount}`,
            newBalance: user.balance
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Withdraw money
app.post('/withdraw', authenticateToken, (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Valid amount is required' });
        }

        const user = accounts[req.user.username];

        if (user.balance < amount) {
            return res.status(400).json({ 
                message: 'Insufficient balance',
                currentBalance: user.balance
            });
        }

        user.balance -= amount;

        res.json({
            message: `Withdrew $${amount}`,
            newBalance: user.balance
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Banking API server running on http://localhost:${PORT}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   POST /login - Login with username/password`);
    console.log(`   GET  /balance - Get account balance (requires token)`);
    console.log(`   POST /deposit - Deposit money (requires token)`);
    console.log(`   POST /withdraw - Withdraw money (requires token)`);
    console.log(`\n🔐 Test credentials:`);
    console.log(`   Username: user1`);
    console.log(`   Password: password123`);
});

module.exports = app;
