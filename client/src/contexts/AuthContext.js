import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // State for storing user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State for managing login status

  // Mock function to simulate user login (replace this with real login logic)
  useEffect(() => {
    // Simulating an admin user for testing purposes
    setCurrentUser({ email: 'admininstan@gmail.com', isAdmin: true });
    setIsLoggedIn(true); // Assuming user is logged in after setting currentUser
  }, []);

  // Function to handle login
  const login = () => {
    setIsLoggedIn(true);
    // Add your logic to set the currentUser here
    setCurrentUser({ email: 'admininstan@gmail.com', isAdmin: true }); // Example: Set an admin user
  };

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null); // Clear the user information on logout
  };

  const value = {
    currentUser,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
