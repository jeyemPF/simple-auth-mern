const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true }, 
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  desk: { type: mongoose.Schema.Types.ObjectId, ref: 'Desk' },
  date: { type: Date, required: true }, // Date of the booking
  time: { type: String, required: true }, // Time of the booking
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
