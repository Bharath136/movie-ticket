

const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true }
});

// Define Movie schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  release_date: { type: Date, required: true }
});

// Define Theater schema
const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  capacity: { type: Number, required: true }
});


// Define Booking schema
const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  seat_number: { type: String, required: true },
  booking_date: { type: Date, default: Date.now }
});

// Create and export the corresponding models
const Users = mongoose.model('Users', userSchema);
const Movie = mongoose.model('Movie', movieSchema);
const Theater = mongoose.model('Theater', theaterSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Users, Movie, Theater, Booking };
