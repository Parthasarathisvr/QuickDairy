import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from AuthContext

  // Function to handle input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);
      console.log("Login response:", res.data);
  
      localStorage.setItem('token', res.data.token);
      login();
  
      const userRole = res.data.role;
      if (userRole === 'admin') {
        navigate('/admin/home');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert('Invalid credentials');
    }
  };
  

  return (
    <div className="container login-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center mb-4 text-primary">LOG IN</h2>
            <form onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                  className="form-control form-control-lg"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  className="form-control form-control-lg"
                  required
                />
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
