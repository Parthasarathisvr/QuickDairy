import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [deletedOrders, setDeletedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeliverClick = (order) => {
    navigate(`/admin/deliver/${order._id}`, { state: { order } });
  };

  const handleDeleteClick = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/orders/${orderId}`);
        
        // Remove the deleted order from the orders list in the state
        setOrders(orders.filter(order => order._id !== orderId));

        // Add the deleted order ID to the deletedOrders state to disable the deliver button
        setDeletedOrders([...deletedOrders, orderId]);
      } catch (error) {
        console.error('Failed to delete order', error);
      }
    }
  };

  const formatAddress = (userDetails) => {
    const { addressLine1, addressLine2, addressLine3, addressLine4, pincode } = userDetails;
    return [addressLine1, addressLine2, addressLine3, addressLine4, pincode]
      .filter(Boolean) // Remove empty or undefined values
      .join(', '); // Join non-empty values with commas
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Today's Orders</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-warning">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">No orders found for today</td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{`${order.userDetails.firstName} ${order.userDetails.lastName}`}</td>
                  <td>{formatAddress(order.userDetails)}</td>
                  <td>{order.userDetails.phone}</td>
                  <td>
                    <ul>
                      {order.cartItems.map((item, i) => (
                        <li key={i}>
                          {item.name} (x{item.quantity}) - {item.selectedSize}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>Rs.{order.totalAmount.toFixed(2)}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeliverClick(order)}
                      disabled={deletedOrders.includes(order._id)} // Disable if deleted
                    >
                      Deliver
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrderPage;
