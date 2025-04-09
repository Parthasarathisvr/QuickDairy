import React, { useState, useEffect } from 'react';
import './BrandPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function BrandPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the server
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const addToCart = (product, selectedSize, quantity) => {
    const item = {
      ...product,
      selectedSize,
      quantity,
    };
    setCartItems([...cartItems, item]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
  };

  const handleAddToCartClick = (product) => {
    const selectedSize = document.querySelector(`#size-select-${product.id}`).value;
    const quantity = document.querySelector(`#quantity-select-${product.id}`).value;
    addToCart(product, selectedSize, parseInt(quantity));
  };

  const navigateToCartPage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/cart');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container brand-page">
      <div className="search-bar-container d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="cart-icon" onClick={navigateToCartPage}>
          🛒 <span id="cart-count" className="badge bg-primary">{cartItems.length}</span>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card product-card h-100">
              <img src={require(`../assets/${product.img}`)} alt={product.name} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <div className="product-options mt-auto">
                  <div className="size-select mb-2">
                    <label>Size</label>
                    <select id={`size-select-${product.id}`} className="form-select">
                      {product.sizes.map((option, index) => (
                        <option key={index} value={option.size}>
                          {option.size} - Rs.{option.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="quantity mb-2">
                    <label>Qty</label>
                    <select id={`quantity-select-${product.id}`} className="form-select">
                      {[...Array(10).keys()].map(num => (
                        <option key={num} value={num + 1}>{num + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandPage;
