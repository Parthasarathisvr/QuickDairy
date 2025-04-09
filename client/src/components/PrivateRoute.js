import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useAuth } from '../contexts/AuthContext'; // Import AuthContext hook

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get currentUser from AuthContext

  // Assume currentUser object has an isAdmin field
  const isAdmin = currentUser && currentUser.isAdmin; // Adjust this check according to your needs

  // Render children if the user is an admin; otherwise, redirect to the login page
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
