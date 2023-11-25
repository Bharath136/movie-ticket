const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  image_url: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String }
});

const models = {
  Product: mongoose.model('Users', productsSchema)
}

module.exports = models;