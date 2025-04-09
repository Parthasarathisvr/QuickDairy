import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to manage authentication

function AdminHeader() {
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/admin/home" className="navbar-brand">Admin Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar" aria-controls="adminNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/admin/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link">Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/brands" className="nav-link">Brands</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link">Users</Link>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button> {/* Logout Button */}
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
