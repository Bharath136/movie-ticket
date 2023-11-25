
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const client = require('../src/db/connect');
const models = require("./models/schema");

app.use(express.json());
app.use(cors())


// Create a new product
app.post('/products', async (req, res) => {
  try {
    const product = new models.Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await models.Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await models.Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update the status of a product by ID
app.put('/products/:id/', async (req, res) => {
  try {
    const { status } = req.body;
    // Check if the request contains the 'status' field
    if (!status) {
      return res.status(400).send({ error: 'Status field is required for updating' });
    }

    const product = await models.Product.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await models.Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


