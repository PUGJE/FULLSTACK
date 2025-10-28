import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="app-header">
          <h1>My Shop</h1>
        </header>
        <main className="app-main">
          <ProductList />
          <ShoppingCart />
        </main>
      </div>
    </Provider>
  );
}

export default App;
