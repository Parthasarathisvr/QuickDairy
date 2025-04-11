const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // To parse JSON bodies for both routes

// MongoDB URI
const mongoURI = 'mongodb+srv://sarathi:071845@cluster-1.lbtsnjq.mongodb.net/new_instant_diaries?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedProducts(); // Call seedProducts after successful connection
  })
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  sizes: [
    {
      size: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],
});

const Product = mongoose.model('Product', productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  userDetails: {
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    addressLine4: String,
    pincode: String,
    phone: String,
  },
  cartItems: [
    {
      name: String,
      quantity: Number,
      selectedSize: String,
    },
  ],
  totalAmount: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: Date,
});

const Order = mongoose.model('Order', orderSchema);

// Delivery Date Schema
const deliveryDateSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  deliveryDate: { type: Date, required: true },
});

const DeliveryDate = mongoose.model('DeliveryDate', deliveryDateSchema);

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === 'admininstant@gmail.com' && password === 'admindairies') {
      const payload = { user: { id: 'admin', role: 'admin' } };
      jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        return res.json({ token, role: 'admin' });
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User does not exist' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const payload = { user: { id: user.id, role: 'user' } };
      jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        return res.json({ token, role: 'user' });
      });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Route to handle order submission
app.post('/submit-order', async (req, res) => {
  try {
    const { userDetails, cartItems, totalAmount } = req.body;

    if (!userDetails || !userDetails.firstName || !userDetails.addressLine1 || !userDetails.pincode) {
      return res.status(400).json({ error: 'Invalid order data. Missing required fields.' });
    }

    const newOrder = new Order({
      userDetails,
      cartItems,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order submitted successfully', orderId: newOrder._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit order' });
  }
});

// Get today's orders
app.get('/orders', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    const orders = await Order.find({ orderDate: { $gte: today } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Add Delivery Date Route
app.post('/orders/:id/delivery-date', async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryDate } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { deliveryDate }, { new: true });

    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Delivery date updated successfully', updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update delivery date' });
  }
});

// Fetch Delivery Date for an Order
app.get('/orders/:id/delivery-date', async (req, res) => {
  try {
    const { id } = req.params;

    const deliveryDate = await DeliveryDate.findOne({ orderId: id });

    if (!deliveryDate) return res.status(404).json({ error: 'Delivery date not found' });

    res.status(200).json(deliveryDate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch delivery date' });
  }
});

// Delete an order
app.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a product
app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Seed Products Function
const products = [
  { id: 1, name: 'Aavin Diet', img: 'brand1.jpg', sizes: [{ size: '500 ml', price: 18 }] },
  { id: 2, name: 'Aavin Green Magic', img: 'brand2.jpg', sizes: [{ size: '225 ml', price: 11.00 }, { size: '500 ml', price: 22.00 }, { size: '5 Litre', price: 220.00 }] },
  { id: 3, name: 'Aavin Nice', img: 'brand3.jpg', sizes: [{ size: '500 ml', price: 20.00 }, { size: '1000 ml', price: 40.00 }] },
  { id: 4, name: 'Aavin Premium', img: 'brand4.jpg', sizes: [{ size: '500 ml', price: 30 }] },
  { id: 5, name: 'Amul Cow Milk', img: 'brand5.jpg', sizes: [{ size: '500 ml', price: 29 }] },
  { id: 6, name: 'Amul Gold Milk', img: 'brand6.jpg', sizes: [{ size: '500 ml', price: 34 }] },
  { id: 7, name: 'Amul Lactose Free Milk', img: 'brand7.jpg', sizes: [{ size: '500 ml', price: 30 }] },
  { id: 8, name: 'Amul Calci Plus Milk', img: 'brand8.jpg', sizes: [{ size: '500 ml', price: 30 }] },
  { id: 9, name: 'Hatsun Cow Milk', img: 'brand9.jpg', sizes: [{ size: '500 ml', price: 29 }] },
  { id: 10, name: 'Arokya Full Cream Milk', img: 'brand10.jpg', sizes: [{ size: '500 ml', price: 34 }] },
  { id: 11, name: 'Aroky Toned Milk', img: 'brand11.jpg', sizes: [{ size: '500 ml', price: 30 }] },
  { id: 12, name: 'Arokya Standardized Milk', img: 'brand12.jpg', sizes: [{ size: '500 ml', price: 30 }] },
  { id: 13, name: 'Amul Buffalo Milk', img: 'brand13.jpg', sizes: [{ size: '500 ml', price: 34 }] },
  { id: 14, name: 'Amul Suar Skimmed Milk', img: 'brand14.jpg', sizes: [{ size: '500 ml', price: 30 }] },
  { id: 15, name: 'Ponlait', img: 'brand15.jpg', sizes: [{ size: '500 ml', price: 30 }] },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products added to database successfully');
  } catch (err) {
    console.error('Error adding products to database:', err);
  }
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
