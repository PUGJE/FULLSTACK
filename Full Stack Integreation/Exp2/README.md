# Redux Toolkit Shopping Cart

A React application demonstrating Redux Toolkit for state management in a shopping cart scenario.

## Features

- **Product Display**: Shows a list of products (Laptop, Mouse, Keyboard) with prices
- **Add to Cart**: Add products to the shopping cart
- **Quantity Management**: Update quantities of items in the cart
- **Remove Items**: Remove items from the cart
- **Real-time Updates**: Cart state updates immediately across components
- **Total Calculation**: Automatically calculates total price

## Redux Toolkit Implementation

### Store Configuration

- Uses `configureStore` for simplified store setup
- Includes cart reducer for state management

### Cart Slice

- **Actions**:
  - `addItem`: Adds a product to cart or increments quantity
  - `removeItem`: Removes an item from cart
  - `updateQuantity`: Updates item quantity or removes if quantity is 0
  - `clearCart`: Clears all items from cart

### React-Redux Integration

- Uses `useSelector` hook to access cart state
- Uses `useDispatch` hook to dispatch actions
- Components automatically re-render when state changes

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing the Application

1. **Add Items**: Click "Add to Cart" buttons to add products
2. **Update Quantities**: Use the quantity input fields to change amounts
3. **Remove Items**: Click "Remove" buttons to delete items
4. **Verify State**: Notice how the cart updates immediately and totals are calculated

## Project Structure

```
src/
├── components/
│   ├── ProductList.tsx      # Product display component
│   ├── ProductList.css
│   ├── ShoppingCart.tsx     # Cart display component
│   └── ShoppingCart.css
├── features/
│   └── cart/
│       └── cartSlice.ts     # Redux slice for cart state
├── store/
│   └── store.ts            # Redux store configuration
├── App.tsx                 # Main app component
├── App.css
└── index.tsx               # App entry point
```

## Key Learning Points

- **Redux Toolkit**: Modern approach to Redux with less boilerplate
- **Slices**: Organize reducers and actions together
- **Immer Integration**: Automatic immutable updates
- **TypeScript Support**: Type-safe state management
- **React-Redux Hooks**: Modern way to connect components to Redux
