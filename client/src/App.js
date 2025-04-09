import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login'; 
import Header from './components/Header';
import AdminHeader from './admin/AdminHeader'; // Import the AdminHeader component
import Body from './components/Body';
import Product from './components/Product';
import Cart from './components/Cart';
import BrandPage from './components/BrandPage';
import Footer from './components/Footer';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import InvoicePage from './components/InvoicePage';
import TraceOrderPage from './components/TraceOrderPage';
import AdminHome from './admin/AdminHome';
import AdminOrdersPages from './admin/AdminOrdersPage';
import AdminBrandPage from './admin/AdminBrandPage';
import AdminDeliverPage from './admin/AdminDeliverPage';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Import useAuth
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import './App.css';

function App() {
  const location = useLocation();
  const { currentUser } = useAuth(); // Get the current user from the Auth context

  const hideHeader = location.pathname === '/signup' || location.pathname === '/login';

  // Determine if the current user is an admin
  const isAdmin = currentUser?.email === 'admininstan@gmail.com';

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {/* Conditionally render the appropriate header */}
      {!hideHeader && (isAdminRoute && isAdmin ? <AdminHeader /> : <Header />)}
      <div className="content-wrapper">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Body />} />
          <Route path="/products" element={<Product />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/invoicepage" element={<InvoicePage />} />
          <Route path="/traceorderpage" element={<TraceOrderPage />} />
          {/* Admin Routes with PrivateRoute */}
          <Route 
            path="/admin/home" 
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <PrivateRoute>
                <AdminOrdersPages />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/products" 
            element={
              <PrivateRoute>
                <AdminBrandPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/deliver/:orderId"  // Dynamic route for AdminDeliverPage
            element={
              <PrivateRoute>
                <AdminDeliverPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
      {!hideHeader && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
