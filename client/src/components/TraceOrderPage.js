import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TraceOrderPage.css'; // Import the CSS file for additional styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function TraceOrderPage({ orderId }) {
  const [showStatus, setShowStatus] = useState(false);
  const [timer, setTimer] = useState(120); // Initial countdown timer set to 2 minutes
  const [deliveryDate, setDeliveryDate] = useState(null);

  useEffect(() => {
    // Fetch the delivery date from the server
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${orderId}/delivery-date`);
        const order = response.data;
        setDeliveryDate(order.deliveryDate);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };

    fetchOrder();

    let interval = null;
    if (showStatus && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showStatus, timer, orderId]);

  return (
    <div className="trace-order-page d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="container text-center">
        <h1 className="success-message mb-4">Hurray! Order Placed Successfully!</h1>
        <div className="checkmark-container mb-4">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100"
            height="100"
          >
            <path
              fill="none"
              stroke="#28a745"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="lead mb-4">Delivery is scheduled for: {deliveryDate ? new Date(deliveryDate).toLocaleDateString() : "Loading..."}</p>
        <button className="btn btn-primary" onClick={() => setShowStatus(true)}>Delivery Status</button>
        {showStatus && (
          <div className="status-overlay">
            <div className="pending-animation"></div>
            <p className="status-message">Please wait for {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TraceOrderPage;
