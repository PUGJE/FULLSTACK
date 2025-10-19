import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onBuyNow }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Price: ${product.price}</p>
      <button 
        className="buy-now-btn" 
        onClick={() => onBuyNow(product)}
        disabled={!product}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
