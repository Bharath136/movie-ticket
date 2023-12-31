const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5100;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./db/connect');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const models = require("./models/schema");

// app.use(bodyParser.json());
app.use(cors());

// user schema
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, type, email, password } = req.body;
    const user = await models.Users.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object
    const newUser = new models.Users({
      firstname,
      lastname,
      type,
      email,
      password: hashedPassword
    });
    // Save the new user to the database
    const userCreated = await newUser.save();
    console.log(userCreated, 'user created');
    return res.status(200).json({ message: 'Successfully registered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await models.Users.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }
//   // Generate a JWT token
//   if (user.type === 'owner') {
//     const ownerToken = jwt.sign({ userId: user._id }, 'agenttoken');
//     res.json({ user, ownerToken });
//   } else if (user.type === 'passenger') {
//     const token = jwt.sign({ userId: user._id }, 'mysecretkey1');
//     res.json({ user, token });
//   } else if (user.type === 'admin') {
//     const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey2');
//     res.json({ user, jwtToken });
//   }
// });


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await models.Users.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate a JWT token
    if (user.type === 'owner') {
        const ownerToken = jwt.sign({ userId: user._id }, 'agenttoken');
        res.json({ user, ownerToken });
    } else if (user.type === 'viewer') {
        const token = jwt.sign({ userId: user._id }, 'mysecretkey1');
        res.json({ user, token });
    } else if (user.type === 'admin') {
        const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey2');
        res.json({ user, jwtToken });
    }
});


// Create a new movie
app.post('/movies', async (req, res) => {
  try {
    const movie = await models.Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all movies
app.get('/movies', async (req, res) => {
  try {
    // const movies = await models.Movie.find().populate('Theater');
    const movies = await models.Movie.find()
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await models.Movie.findById(id).populate('theater');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Create a new theatre
app.post('/theatres', async (req, res) => {
  try {
    const theatre = await models.Theatre.create(req.body);
    res.status(201).json(theatre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all theatres
app.get('/theatres', async (req, res) => {
  try {
    const theatres = await models.Theatre.find().populate('movies');
    res.json(theatres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create a new booking
// app.post('/bookings', async (req, res) => {
//   console.log(req.body)
//   try {
//     const booking = await models.Booking.create(req.body);
//     const seats = booking.seatNumbers
//     const movieId = booking.movie
//     const theatreId = booking.theatre._id
//     const movie = await models.Movie.findById(movieId)
    
//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });


// app.put('/movies/:id/reservedSeats', async (req, res) => {
//   const movieId = req.params.id;
//   const { theatreId, reservedSeats } = req.body;
  
//   try {
//     const movie = await models.Movie.findById(movieId);
//     if (!movie) {
//       return res.status(404).json({ error: 'Movie not found' });
//     }
    
//     const theatre = movie.theatre.find(t => t._id.toString() === theatreId);
//     if (!theatre) {
//       return res.status(404).json({ error: 'Theatre not found' });
//     }
    
//     theatre.reservedSeats= [];
    
//     const updatedMovie = await movie.save();
//     res.status(200).json(updatedMovie);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });




app.post('/bookings', async (req, res) => {
  try {
    // const { seatNumbers, movie, theatre } = req.body;
    
    const booking = await models.Booking.create(req.body);
    const seats = booking.seatNumbers;
    const movieId = booking.movie;
    const theatreId = booking.theatre._id;
    
    const movie = await models.Movie.findById(movieId);
    const theaterIndex = movie.theatre.findIndex(t => t._id.toString() === theatreId.toString());
    
    if (theaterIndex !== -1) {
      movie.theatre[theaterIndex].reservedSeats.push(...seats);
      await movie.save();
    } else {
      throw new Error('Theater not found');
    }
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Get all bookings
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await models.Booking.find().populate('user movie');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Airline
app.post('/theatre-register', async (req, res) => {
  try {
    const { theatreName, capacity, location, password } = req.body;
    const theatre = await models.Theatre.findOne({ theatreName });

    if (theatre) {
      return res.status(400).json({ message: 'Theatre already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTheatre = await models.Theatre.create({
      theatreName,
      location,
      capacity,
      password: hashedPassword
    });

    console.log(newTheatre, 'theatre created');
    return res.status(200).json({ message: 'Theatre successfully registered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/theatre-login', async (req, res) => {
  const { theatreName, password } = req.body;
  const theatre = await models.Theatre.findOne({ theatreName });

  if (!theatre) {
    return res.status(401).json({ message: 'Invalid theatre name or password' });
  }

  const isMatch = await bcrypt.compare(password, theatre.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid theatre name or password' });
  }

  const token = jwt.sign({ theatreId: theatre._id }, 'your_secret_key');
  res.json({ theatre, token });
});


// get users
app.get('/users', async (req, res) => {
  try {
    const users = await models.Users.find();
    res.send(users);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
});

// Create a new theatre
// app.post('/threatre', async (req, res) => {
//   try {
//     const theatre = new models.Theatre(req.body);
//     const savedTheatre = await theatre.save();
//     res.status(201).json(savedTheatre);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// Get a single flight by ID
app.get('/theatre/:id', async (req, res) => {
  try {
    const theatre = await models.Theatre.findById(req.params.id);
    if (!theatre) {
      return res.status(404).json({ message: 'theatre not found' });
    }
    res.json(theatre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all Theatres
app.get('/theatre', async (req, res) => {
  try {
    const theatres = await models.Theatre.find();
    res.json(theatres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/bookings/user/:userId', async (req, res) => {
  try {
    const bookingDetails = await models.Booking.find({ user: req.params.userId }).populate('movie');
    res.status(200).json(bookingDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get('/bookings/theatre/:theatreId', async (req, res) => {
  try {
    const bookingDetails = await models.Booking.findOne({ theatre: req.params.theatreId });
    res.status(200).json(bookingDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



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
app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { price, quantity, status } = req.body;
    console.log(price)

    // Validate if required fields are present
    if (!price || !quantity || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find and update the product
    const updatedProduct = await models.Product.findByIdAndUpdate(
      productId,
      { price, quantity, status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;