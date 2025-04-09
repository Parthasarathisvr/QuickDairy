import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

function AdminDeliverPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const { order } = location.state || {}; 

  const [productAvailable, setProductAvailable] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [date, setDate] = useState(null);
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success state

  // Handle product availability check
  const handleCheckAvailability = () => {
    setProductAvailable(true); 
  };

  // Handle location verification
  const handleVerifyLocation = () => {
    setLocationVerified(true); 
  };

  // Handle date selection
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setDateConfirmed(false); 
  };

  // Handle delivery date confirmation
  const handleConfirmDate = async () => {
    if (date) {
      try {
        await axios.post(`http://localhost:5000/orders/${orderId}/delivery-date`, { deliveryDate: date });
        setDateConfirmed(true);
        setSuccess('Delivery date confirmed successfully');
        setError(null);
      } catch (error) {
        setError('Failed to update delivery date');
        setSuccess(null);
      }
    }
  };

  // Handle order delivery
  const handleDeliverOrder = () => {
    alert('Order has been delivered successfully!');
  };

  // Check if all conditions are met to enable the "Deliver Order" button
  const isDeliverOrderEnabled = productAvailable && locationVerified && dateConfirmed;

  return (
    <div className="container mt-5">
      <h1>Deliver Order for {order?.userDetails.firstName} {order?.userDetails.lastName}</h1>
      <h5>Order ID: {orderId}</h5>

      <div className="row">
        <div className="d-flex mb-4">
          {/* Product Details & Product Availability Section */}
          <div className="card shadow-sm flex-fill" style={{ minHeight: '300px' }}>
            <div className="card-body">
              <h5 className="card-title">Product Details & Availability</h5>
              <table className="table table-bordered">
                <thead className="table-warning">
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.selectedSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button 
                className="btn btn-primary mt-3" 
                onClick={handleCheckAvailability}
                disabled={productAvailable} // Disable button after checking
              >
                {productAvailable ? 'Available' : 'Check Availability'}
              </button>
              {productAvailable && <span className="ms-3 text-success">&#10003; Product Available</span>}
            </div>
          </div>

          {/* Location Details & Location Verification Section */}
          <div className="card shadow-sm flex-fill ms-3" style={{ minHeight: '300px' }}>
            <div className="card-body">
              <h5 className="card-title">Location Details & Verification</h5>
              <p>Customer Location: </p>
              <p>{order?.userDetails.addressLine1}, {order?.userDetails.addressLine2}, {order?.userDetails.addressLine3}</p>
              <button 
                className="btn btn-warning" 
                onClick={handleVerifyLocation}
                disabled={locationVerified} // Disable button after verifying
              >
                {locationVerified ? 'Verified' : 'Verify Location'}
              </button>
              {locationVerified && <span className="ms-3 text-success">&#10003; Location Verified</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Date Section */}
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pick Delivery Date</h5>
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="mx-auto"
              />
              <button
                className="btn btn-success mt-3"
                onClick={handleConfirmDate}
                disabled={!date || dateConfirmed} // Disable button after confirming date
              >
                {dateConfirmed ? 'Date Confirmed' : 'Pick Delivery Date'}
              </button>
              {dateConfirmed && (
                <div className="mt-3 text-success">
                  Delivery date {date.toDateString()} confirmed
                </div>
              )}
              {error && <p className="text-danger mt-2">{error}</p>}
              {success && <p className="text-success mt-2">{success}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Deliver Order Button Section */}
      <div className="text-center mt-4">
        <button
          className="btn btn-danger"
          onClick={handleDeliverOrder}
          disabled={!isDeliverOrderEnabled} // Enable only if all conditions are met
        >
          Deliver Order
        </button>
      </div>
    </div>
  );
}

export default AdminDeliverPage;
