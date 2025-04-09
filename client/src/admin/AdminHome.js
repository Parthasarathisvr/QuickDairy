import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHome.css'; // Ensure this file exists with the necessary styles
import { FaSmile, FaBox, FaTrophy, FaRoad } from 'react-icons/fa'; // Import icons

const AdminHome = () => {
  const [happyCustomers, setHappyCustomers] = useState(0);
  const [fulfilledOrders, setFulfilledOrders] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const [successfulJourney, setSuccessfulJourney] = useState(0);

  useEffect(() => {
    // Function to increment counters
    const incrementCounters = (target, setFunction, increment, interval) => {
      let count = 0;
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        setFunction(count);
      }, interval);
    };

    // Initialize counters with specific targets and increments
    incrementCounters(1234, setHappyCustomers, 100, 1300);
    incrementCounters(5678, setFulfilledOrders, 4800, 6000);
    incrementCounters(10, setAchievements, 1, 700);
    incrementCounters(3, setSuccessfulJourney, 1, 1000);
  }, []);

  return (
    <div className="admin-home">
      <h1 className="text-center mb-4">Dashboard</h1>
      <div className="row justify-content-center">
        <div className="col-md-5 mb-4">
          <div className="card text-center p-4 stat bg-primary text-white gradient">
            <FaSmile className="stat-icon" />
            <h2 className="card-title">Happy Customers</h2>
            <p className="card-text count">{happyCustomers}+</p>
          </div>
        </div>
        <div className="col-md-5 mb-4">
          <div className="card text-center p-4 stat bg-success text-white gradient">
            <FaBox className="stat-icon" />
            <h2 className="card-title">Fulfilled Orders</h2>
            <p className="card-text count">{fulfilledOrders}+</p>
          </div>
        </div>
        <div className="col-md-5 mb-4">
          <div className="card text-center p-4 stat bg-warning text-dark gradient">
            <FaTrophy className="stat-icon" />
            <h2 className="card-title">Achievements</h2>
            <p className="card-text count">{achievements}+</p>
          </div>
        </div>
        <div className="col-md-5 mb-4">
          <div className="card text-center p-4 stat bg-danger text-white gradient">
            <FaRoad className="stat-icon" />
            <h2 className="card-title">Successful Journey</h2>
            <p className="card-text count">{successfulJourney} years+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
