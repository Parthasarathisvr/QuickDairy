import React, { useEffect, useState } from 'react';
import './InvoicePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function InvoicePage() {
  const [userDetails, setUserDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Create navigate function

  useEffect(() => {
    // Fetch user details from local storage
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);

    // Fetch cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.sizes.find((size) => size.size === item.selectedSize).price;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateTotalPrice();
    return subtotal * 0.05; // 5% tax
  };

  const calculateTotalWithTax = () => {
    return calculateTotalPrice() + calculateTax();
  };

  const handleSubmitOrder = async () => {
    const totalAmount = calculateTotalWithTax();

    try {
      // Send order details to the server
      await axios.post('http://localhost:5000/submit-order', {
        userDetails,
        cartItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          price: item.sizes.find(size => size.size === item.selectedSize).price,
        })),
        totalAmount,
      });

      // Navigate to TraceOrderPage after successful order submission
      navigate('/traceorderpage');
    } catch (error) {
      alert('Failed to submit order');
      console.error(error);
    }
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Add company details and invoice title
    doc.setFontSize(22);
    doc.text('INSTANT DAIRIES', 20, 20);
    doc.setFontSize(16);
    doc.text('www.instantdairies.com', 20, 30);
    doc.text('(0413) 456 7890', 20, 40);
    doc.setFontSize(18);
    doc.text('INVOICE', 150, 20);
    doc.text(`#INV${Math.floor(Math.random() * 1000000)}`, 150, 30);

    // Add customer details
    doc.setFontSize(14);
    doc.text(`Name: ${userDetails.firstName} ${userDetails.lastName}`, 20, 60);
    doc.text(`Address: ${userDetails.addressLine1}, ${userDetails.addressLine2}`, 20, 70);
    doc.text(`Phone: ${userDetails.phone}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 60);

    // Add order details
    doc.text('Order Details:', 20, 100);
    cartItems.forEach((item, index) => {
      const yOffset = 110 + index * 10;
      doc.text(`${item.name} - Qty: ${item.quantity} - Price: Rs.${item.sizes.find(size => size.size === item.selectedSize).price} - Amount: Rs.${item.sizes.find(size => size.size === item.selectedSize).price * item.quantity}`, 20, yOffset);
    });

    // Add totals and tax
    doc.text(`Subtotal: Rs.${calculateTotalPrice().toFixed(2)}`, 20, 160);
    doc.text(`Tax (5%): Rs.${calculateTax().toFixed(2)}`, 20, 170);
    doc.text(`Total: Rs.${calculateTotalWithTax().toFixed(2)}`, 20, 180);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="invoice-header p-3 mb-3">
        <div className="row align-items-center">
          <div className="col-6">
            <h2 className="company-name">INSTANT DAIRIES</h2>
            <p className="company-details">
              www.instantdairies.com<br />
              (0413) 456 7890
            </p>
          </div>
          <div className="col-6 text-end">
            <h3 className="invoice-title">INVOICE</h3>
            <p className="invoice-number">#INV{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>
      </div>

      {/* Bill To and Invoice Info */}
      <div className="row mb-4">
        <div className="col-6">
          <h5><strong>Bill To:</strong></h5>
          <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
          <p><strong>Address:</strong> {userDetails.addressLine1}, {userDetails.addressLine2},{userDetails.addressLine3},{userDetails.addressLine4},{userDetails.pincode}.</p>
        </div>
        <div className="col-6 text-end">
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Order Details Table */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
          <thead className="table-warning">
            <tr>
              <th>Description</th>
              <th>Qty.</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs.{item.sizes.find(size => size.size === item.selectedSize).price}</td>
                <td>Rs.{item.sizes.find(size => size.size === item.selectedSize).price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Terms, Conditions, and Totals */}
      <div className="row mb-4">
        <div className="col-6">
          <h5>Terms and Conditions:</h5>
          <p>Payment is due within 15 days from the date of the invoice.</p>
        </div>
        <div className="col-6 text-end">
          <p><strong>Subtotal:</strong> Rs.{calculateTotalPrice().toFixed(2)}</p>
          <p><strong>Tax (5%):</strong> Rs.{calculateTax().toFixed(2)}</p>
          <h5><strong>Total:</strong> Rs.{calculateTotalWithTax().toFixed(2)}</h5>
        </div>
      </div>

      {/* Payment Method and Signature */}
      <div className="row mb-4">
        <div className="col-6">
          <h5>Payment Method:</h5>
          <p>
            <input type="radio" name="paymentMethod" value="Cash" /> Cash &nbsp;
            <input type="radio" name="paymentMethod" value="Bank Transfer" /> Bank Transfer &nbsp;
            <input type="radio" name="paymentMethod" value="Debit" /> Debit &nbsp;
            <input type="radio" name="paymentMethod" value="Digital Wallet" /> Digital Wallet
          </p>
        </div>
        <div className="col-6 text-end">
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><em>Parthasarathi</em></p>
          <p>______________________</p>
        </div>
      </div>

      {/* Submit Order and Download Invoice Buttons */}
      <div className="row mb-4">
        <div className="col-6">
          <button className="btn btn-success" onClick={handleSubmitOrder}>Submit Order</button>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-secondary" onClick={handleDownloadInvoice}>Download Invoice</button>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
