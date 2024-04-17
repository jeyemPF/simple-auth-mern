// Desk.js (Model)

const mongoose = require('mongoose');

const deskSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  available: { type: Boolean, default: true }, // Indicates whether the desk is available or not
  // Other desk fields as needed
});

const Desk = mongoose.model('Desk', deskSchema);

module.exports = Desk;
