// seedProducts.js

const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ensure the path to the Product model is correct

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/new_instant_diaries'; // Replace with your actual MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the products array
const products = [
  {
    id: 1,
    name: 'Aavin Diet',
    img: 'brand1.jpg',
    sizes: [
      { size: '500 ml', price: 18 },
    ],
  },
  {
    id: 2,
    name: 'Aavin Green Magic',
    img: 'brand2.jpg',
    sizes: [
      { size: '225 ml', price: 11.00 },
      { size: '500 ml', price: 22.00 },
      { size: '5 Litre', price: 220.00 },
    ],
  },
  {
    id: 3,
    name: 'Aavin Nice',
    img: 'brand3.jpg',
    sizes: [
      { size: '500 ml', price: 20.00 },
      { size: '1000 ml', price: 40.00 },
    ],
  },
  // Add all remaining products here
  {
    id: 4,
    name: 'Aavin Premium',
    img: 'brand4.jpg',
    sizes: [
      { size: '500 ml', price: 30 },
    ],
  },
  {
    id: 5,
    name: 'Amul Cow Milk',
    img: 'brand5.jpg',
    sizes: [
      { size: '500 ml', price: 29 },
    ],
  },
  {
    id: 6,
    name: 'Amul Gold Milk',
    img: 'brand6.jpg',
    sizes: [
      { size: '500 ml', price: 34 },
    ],
  },
  {
    id: 7,
    name: 'Amul Lactose Free Milk',
    img: 'brand7.jpg',
    sizes: [
      { size: '500 ml', price: 30 },
    ],
  },
  {
    id: 8,
    name: 'Amul Calci Plus Milk',
    img: 'brand8.jpg',
    sizes: [
      { size: '500 ml', price: 30 },
    ],
  },
  {
    id: 9,
    name: 'Hatsun Cow Milk',
    img: 'brand9.jpg',
    sizes: [
      { size: '500 ml', price: 29 },
    ],
  },
  {
    id: 10,
    name: 'Arokya Full Cream Milk',
    img: 'brand10.jpg',
    sizes: [
      { size: '500 ml', price: 34 },
    ],
  },
  {
    id: 11,
    name: 'Aroky Toned Milk',
    img: 'brand11.jpg',
    sizes: [
      { size: '500 ml', price: 30 },
    ],
  },
  {
    id: 12,
    name: 'Arokya Standardized Milk',
    img: 'brand12.jpg',
    sizes: [
      { size: '500 ml', price: 30 },
    ],
  },
  {
    id: 13,
    name: 'Amul Buffalo Milk',
    img: 'brand13.jpg',
    sizes: [
      { size: '500 ml', price: 34 },
    ],
  },
  {
    id: 14,
    name: 'Amul Suar Skimmed Milk',
    img: 'brand14.jpg',
    sizes: [
      { size: '500 ml', price: 30 },
    ],
  },
  {
    id: 15,
    name: 'Ponlait',
    img: 'brand15.jpg',
    sizes: [
      { size: '500 ml', price: 30 },
    ],
  },
];

// Function to insert products
const seedProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log('Products added to database successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error adding products to database:', err);
  }
};

// Call the function
seedProducts();
