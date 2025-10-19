import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching products from API...');
      
      const response = await productAPI.getAllProducts();
      
      if (response.success) {
        setProducts(response.data);
        console.log('Products fetched successfully:', response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle buy now button click
  const handleBuyNow = (product) => {
    alert(`You clicked "Buy Now" for ${product.name} - $${product.price}`);
    console.log('Buy now clicked for product:', product);
  };

  // Handle retry
  const handleRetry = () => {
    fetchProducts();
  };

  // Render loading state
  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  // Render error state
  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  // Render products
  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Product List</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={handleBuyNow}
            />
          ))
        ) : (
          <div className="no-products">
            <p>No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
