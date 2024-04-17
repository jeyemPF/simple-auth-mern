const mongoose = require('mongoose');

const deskSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  available: { type: Boolean, default: true },
  amenities: [String], // Array of strings to store amenities
  // Other desk fields as needed
});

const Desk = mongoose.model('Desk', deskSchema);

module.exports = Desk;
