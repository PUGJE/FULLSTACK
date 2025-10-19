const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    description: "High-performance laptop for work and gaming"
  },
  {
    id: 2,
    name: "Mouse",
    price: 25,
    description: "Wireless optical mouse with ergonomic design"
  },
  {
    id: 3,
    name: "Keyboard",
    price: 45,
    description: "Mechanical keyboard with RGB lighting"
  }
];

// Routes
app.get('/api/products', (req, res) => {
  try {
    // Simulate a small delay to demonstrate loading state
    setTimeout(() => {
      res.json({
        success: true,
        data: products,
        message: "Products fetched successfully"
      });
    }, 1000);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    res.json({
      success: true,
      data: product,
      message: "Product fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
