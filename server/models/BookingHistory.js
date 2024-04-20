const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  deskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Desk' },
  date: { type: Date, default: Date.now },
  time: String,
});

const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

module.exports = BookingHistory;
