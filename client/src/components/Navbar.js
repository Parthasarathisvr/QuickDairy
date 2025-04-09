import React from 'react';
import { Link } from 'react-router-dom';
//import './Navbar.css';

function Navbar({ userType }) {  // userType can be 'user' or 'admin'
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Instant Diaries
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Display menu items based on user type */}
            {userType === 'user' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
              </>
            )}
            {userType === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-home">
                    Admin Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-orders">
                    Orders
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
