import React, { useState, useEffect } from 'react';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/bookings');
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
      <h2>Booking List</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.employee.name}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;
