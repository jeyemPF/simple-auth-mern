const mongoose = require('mongoose');

const deskSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  available: { type: Boolean, default: true },

});

const Desk = mongoose.model('Desk', deskSchema);

module.exports = Desk;
