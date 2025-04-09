import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page when "Log In" is clicked
  };

  return (
    <div className="container signup-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
                  placeholder="Username"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  className="form-control"
                  required
                />
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </div>
              <div className="text-center login-link">
                <p>Already have an account? <button type="button" className="btn btn-link p-0" onClick={handleLoginClick}>Log In</button></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
