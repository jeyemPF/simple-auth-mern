
const mongoose = require('mongoose');

const deskSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  // Other desk fields as needed
});

const Desk = mongoose.model('Desk', deskSchema);

module.exports = Desk;
