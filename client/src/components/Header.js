import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo4.jpg';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (event, path) => {
    event.preventDefault();
    if (isLoggedIn) {
      navigate(path);
    } else {
      setMessage('Please log in to continue.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="Company Logo" className="logo-img me-3" />
          <span className="navbar-brand mb-0 h1"></span>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="navbar-nav ms-auto">
            <NavLink
              to="/"
              className="nav-link"
              onClick={(event) => handleNavClick(event, '/')}
            >
              HOME
            </NavLink>
            <NavLink
              to="/products"
              className="nav-link"
              onClick={(event) => handleNavClick(event, '/products')}
            >
              PRODUCTS
            </NavLink>
            <NavLink
              to="/brands"
              className="nav-link"
              onClick={(event) => handleNavClick(event, '/brands')}
            >
              BRANDS
            </NavLink>
            <NavLink
              to="/cart"
              className="nav-link"
              onClick={(event) => handleNavClick(event, '/cart')}
            >
              CART
            </NavLink>
          </nav>
          <div className="auth-links ms-3">
            {location.pathname === '/' ? (
              <>
                <a href="/login" className="btn btn-outline-primary me-2">LOGIN</a>
                <a href="/signup" className="btn btn-outline-success">SIGNUP</a>
              </>
            ) : null}
            {isLoggedIn && location.pathname !== '/' ? (
              <button className="btn btn-danger ms-2" onClick={handleLogout}>
                LOGOUT
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Message Display */}
      {showMessage && (
        <div className="alert alert-warning position-absolute top-0 start-50 translate-middle-x mt-3">
          {message}  
        </div>
      )}
    </header>
  );
}

export default Header;