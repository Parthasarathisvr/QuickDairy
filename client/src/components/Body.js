// src/components/Body.js

import React from 'react';
import Carousel from 'react-bootstrap/Carousel'; // Import Carousel component
import './Body.css';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import bg1 from '../assets/bg1.jpg'; // Updated brand images
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import bg4 from '../assets/bg4.jpg';
import bg5 from '../assets/bg5.jpg';
import bg6 from '../assets/bg6.jpg';
import bg7 from '../assets/bg7.jpg';
import bg8 from '../assets/bg8.jpg';
import bg9 from '../assets/bg9.jpg';
import bg10 from '../assets/bg10.jpg';
import bg11 from '../assets/bg11.jpg';
import bg12 from '../assets/bg12.jpg';
import headerImage1 from '../assets/logo18.jpg'; // First carousel image
import headerImage2 from '../assets/logo13.jpg'; // Second carousel image
import headerImage3 from '../assets/logo16.jpg'; // Third carousel image
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Body() {
  const notificationStyle = {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    margin: 0,
    whiteSpace: 'nowrap', // Ensure text stays in a single line for scrolling
    animation: 'scroll-left 10s linear infinite', // Slower animation speed for scrolling
  };

  return (
    <div className="body-wrapper container mt-4">
      {/* Header Carousel */}
      <div className="header-image mb-4">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid rounded"
              src={headerImage1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid rounded"
              src={headerImage2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid rounded"
              src={headerImage3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Notification */}
      <div className="notification alert alert-warning text-center" role="alert">
        <p style={notificationStyle}>
          Special Offer: Get 20% off on Below products! Limited time only.
        </p>
      </div>

      {/* Products Section */}
      <div className="body-container row g-4">
        {/* Product 1 */}
        <div className="col-md-3">
          <div className="card product-card">
            <img src={product1} className="card-img-top product-image" alt="Product 1" />
          </div>
        </div>

        {/* Product 2 */}
        <div className="col-md-3">
          <div className="card product-card">
            <img src={product2} className="card-img-top product-image" alt="Product 2" />
          </div>
        </div>

        {/* Product 3 */}
        <div className="col-md-3">
          <div className="card product-card">
            <img src={product3} className="card-img-top product-image" alt="Product 3" />
          </div>
        </div>

        {/* Product 4 */}
        <div className="col-md-3">
          <div className="card product-card">
            <img src={product4} className="card-img-top product-image" alt="Product 4" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section mt-5 p-4 bg-light rounded shadow">
        <h2>About Us</h2>
        <p>
          Instant Diaries is a website where you can order your dairy products instantly. Here we provide all brands which are available in markets. The feature of this website is that we provide "FRESH MILK" to the users from 'Small-Scale Dairy Farming' and 'Milk Societies'. To support local cattle farmers, we extend their products online.
        </p>
      </div>

      {/* Our Brands Section */}
      <div className="our-brands-section mt-5">
        <h2 className="text-center mb-4">AVALABLE BRANDS</h2>
        <div className="row g-4">
          {/* Row 1 */}
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg1} className="card-img-top brand-image" alt="Brand 1" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg2} className="card-img-top brand-image" alt="Brand 2" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg3} className="card-img-top brand-image" alt="Brand 3" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg4} className="card-img-top brand-image" alt="Brand 4" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg5} className="card-img-top brand-image" alt="Brand 5" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg12} className="card-img-top brand-image" alt="Brand 10" />
            </div>
            </div>
        </div>

        {/* Row 2 */}
        <div className="row g-4 mt-4">
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg6} className="card-img-top brand-image" alt="Brand 6" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg7} className="card-img-top brand-image" alt="Brand 7" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg8} className="card-img-top brand-image" alt="Brand 8" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg9} className="card-img-top brand-image" alt="Brand 9" />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg10} className="card-img-top brand-image" alt="Brand 10" />
            </div>
           </div>
           <div className="col-md-2">
            <div className="card brand-card">
              <img src={bg11} className="card-img-top brand-image" alt="Brand 10" />
            </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default Body;
