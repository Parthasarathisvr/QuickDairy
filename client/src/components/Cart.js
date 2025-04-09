import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.sizes.find(size => size.size === item.selectedSize).price;
      return total + price * item.quantity;
    }, 0);
  };

  const handleDelete = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handlePlaceOrder = () => {
    // Redirect to the Order Confirmation page
    window.location.href = '/order-confirmation';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order Summary</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="order-summary">
          {cartItems.map((item, index) => (
            <div key={index} className="row mb-3 p-3 border rounded cart-item">
              <div className="col-md-8">
                <h5>{item.name}</h5>
                <p>Size: {item.selectedSize}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: Rs.{item.sizes.find(size => size.size === item.selectedSize).price * item.quantity}</p>
              </div>
              <div className="col-md-4 text-end">
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="row mt-4">
            <div className="col-md-6">
              <h4>Total Price: Rs.{calculateTotalPrice()}</h4>
            </div>
            <div className="col-md-6 text-end">
              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary btn-lg"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
