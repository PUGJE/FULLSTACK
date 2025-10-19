# React + Express Full Stack Integration

This project demonstrates how to connect a React frontend to an Express.js backend API using Axios for HTTP requests.

## Features

- **Express.js Backend**: RESTful API with product data
- **React Frontend**: Modern UI with dark theme
- **Axios Integration**: HTTP client for API communication
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error management
- **Responsive Design**: Mobile-friendly layout

## Project Structure

```
├── server.js              # Express backend server
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   └── App.js         # Main React app
│   └── package.json       # Frontend dependencies
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. **Install backend dependencies:**

   ```bash
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Start the backend server:**

   ```bash
   npm run dev
   ```

   The server will run on http://localhost:5000

2. **Start the React frontend (in a new terminal):**
   ```bash
   cd client
   npm start
   ```
   The frontend will run on http://localhost:3000

### API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/health` - Health check

## Key Components

### Backend (Express.js)

- **CORS enabled** for cross-origin requests
- **Error handling middleware** for robust error management
- **Sample product data** with realistic pricing
- **Simulated delay** to demonstrate loading states

### Frontend (React)

- **ProductList Component**: Main component that fetches and displays products
- **ProductCard Component**: Individual product display card
- **LoadingSpinner Component**: Loading state indicator
- **ErrorMessage Component**: Error state with retry functionality
- **API Service Layer**: Centralized Axios configuration

### Axios Integration

- **Base URL configuration** for API endpoints
- **Request/Response interceptors** for logging
- **Timeout handling** for network issues
- **Error transformation** for user-friendly messages

## Features Demonstrated

1. **Data Fetching**: Using Axios to fetch product data from Express API
2. **Loading States**: Showing spinner while data is being fetched
3. **Error Handling**: Graceful error handling with retry functionality
4. **Component Lifecycle**: Using useEffect for data fetching on mount
5. **State Management**: Using useState for component state
6. **API Integration**: Clean separation between API calls and UI components

## Styling

The application features a modern dark theme with:

- Dark background (#1a1a1a)
- White text for contrast
- Blue accent color (#007bff)
- Hover effects and transitions
- Responsive design for mobile devices

## Testing the Integration

1. Start both servers (backend and frontend)
2. Open http://localhost:3000 in your browser
3. You should see the product list with loading state
4. Products should load and display with "Buy Now" buttons
5. Click "Buy Now" to see the interaction
6. Try stopping the backend server to see error handling

## Troubleshooting

- **CORS Issues**: Make sure the backend server is running on port 5000
- **Network Errors**: Check if both servers are running
- **Port Conflicts**: Change ports in server.js and package.json if needed
