import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmationPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderConfirmationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '', // Replacing gender with city
    monthlySubscription: '', // Replacing age with monthly subscription
    email: '',
    password: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '', 
    addressLine4: '', // Corrected: Address Line 4 should have its own field
    pincode: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to local storage
    localStorage.setItem('userDetails', JSON.stringify(formData));
    console.log('Form submitted with details:', formData);

    // Clear form data after submission
    setFormData({
      firstName: '',
      lastName: '',
      city: '',
      monthlySubscription: '',
      email: '',
      password: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '', 
      pincode: '',
      phone: '',
    });

    // Navigate to the invoice page after submission
    navigate('/invoicepage');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">USER DETAILS</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">First Name *</label>
            <input 
              type="text" 
              name="firstName" 
              className="form-control" 
              value={formData.firstName} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name *</label>
            <input 
              type="text" 
              name="lastName" 
              className="form-control" 
              value={formData.lastName} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>
        
        {/* Replacing Gender with City */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">City *</label>
            <select 
              name="city" 
              className="form-select" 
              value={formData.city} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select City</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Pune">Pune</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
            </select>
          </div>
          
          {/* Replacing Age with Monthly Subscription */}
          <div className="col-md-6">
            <label className="form-label">Monthly Subscription *</label>
            <select 
              name="monthlySubscription" 
              className="form-select" 
              value={formData.monthlySubscription} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select Subscription</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">User Email *</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">User Password *</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              value={formData.password} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>
        
        <h3 className="mb-3">Billing Address</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Address Line 1 *</label>
            <input 
              type="text" 
              name="addressLine1" 
              className="form-control" 
              value={formData.addressLine1} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address Line 2</label>
            <input 
              type="text" 
              name="addressLine2" 
              className="form-control" 
              value={formData.addressLine2} 
              onChange={handleInputChange} 
            />
          </div>
        </div>

        {/* Replacing Country with Address Line 3 */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Address Line 3 *</label>
            <input 
              type="text" 
              name="addressLine3" 
              className="form-control" 
              value={formData.addressLine3} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address Line 4 *</label>
            <input 
              type="text" 
              name="addressLine4" 
              className="form-control" 
              value={formData.addressLine4} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Pincode *</label>
            <input 
              type="text" 
              name="pincode" 
              className="form-control" 
              value={formData.pincode} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone *</label>
            <input 
              type="tel" 
              name="phone" 
              className="form-control" 
              value={formData.phone} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
}

export default OrderConfirmationPage;
