// models/Product.js

const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  sizes: [sizeSchema], // Embedding the size schema as an array
});

const Product = mongoose.models('Product', productSchema);

module.exports = Product;
