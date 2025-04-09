// src/components/Product.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import product5 from '../assets/product5.jpg';
import product6 from '../assets/product6.jpg';
import product7 from '../assets/product7.jpg';
import product8 from '../assets/product8.jpg';
import product9 from '../assets/product9.jpg';
import product10 from '../assets/product10.jpg';
import product11 from '../assets/product11.jpg';
import product12 from '../assets/product12.jpg';

function Product() {
  const navigate = useNavigate();

  const products = [
    { img: product1, alt: "Product 1", label: "Product 1", marketPrice: 20, offerPrice: 15 },
    { img: product2, alt: "Product 2", label: "Product 2", marketPrice: 25, offerPrice: 18 },
    { img: product3, alt: "Product 3", label: "Product 3", marketPrice: 30, offerPrice: 20 },
    { img: product4, alt: "Product 4", label: "Product 4", marketPrice: 35, offerPrice: 25 },
    { img: product5, alt: "Product 5", label: "Product 5", marketPrice: 40, offerPrice: 30 },
    { img: product6, alt: "Product 6", label: "Product 6", marketPrice: 45, offerPrice: 35 },
    { img: product7, alt: "Product 7", label: "Product 7", marketPrice: 50, offerPrice: 40 },
    { img: product8, alt: "Product 8", label: "Product 8", marketPrice: 55, offerPrice: 45 },
    { img: product9, alt: "Product 9", label: "Product 9", marketPrice: 60, offerPrice: 50 },
    { img: product10, alt: "Product 10", label: "Product 10", marketPrice: 65, offerPrice: 55 },
    { img: product11, alt: "Product 11", label: "Product 11", marketPrice: 70, offerPrice: 60 },
    { img: product12, alt: "Product 12", label: "Product 12", marketPrice: 75, offerPrice: 65 },
  ];

  const handleProductClick = (product) => {
    navigate('/brands', { state: product });
  };

  return (
    <div className="product-container">
      {[0, 1, 2].map((rowIndex) => (
        <div className="image-row" key={rowIndex}>
          {products.slice(rowIndex * 4, rowIndex * 4 + 4).map((product, index) => (
            <div
              className="image-container"
              key={index}
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.img} alt={product.alt} />
              <div className="product-label">{product.label}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Product;
