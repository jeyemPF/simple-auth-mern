import React, { useState, useEffect } from 'react';

function BookingHistory({ employeeId }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [employeeId]); // useEffect will run whenever employeeId changes

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:3001/bookings/${employeeId}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div>
      <h2>Booking History</h2>
      <table>
        <thead>
          <tr>
            <th>Desk</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.desk.name}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingHistory;
