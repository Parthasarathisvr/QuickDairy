import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@instantdiaries.com</p>
          <p>Phone: +91 72318 72318</p>
          <p>Address: Chennai</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Instant Diaries. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
