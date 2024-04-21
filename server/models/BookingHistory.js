const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'Booking' },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  deskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Desk' }, // Change this to deskId
});

const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

module.exports = BookingHistory;
