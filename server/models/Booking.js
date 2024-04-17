// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  desk: { type: mongoose.Schema.Types.ObjectId, ref: 'Desk' }, 
  
  
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
