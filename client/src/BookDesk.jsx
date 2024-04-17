// BookDesk.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookDesk() {
  const [deskId, setDeskId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/book-desk', { deskId, bookingDetails: { date, time } });
      if (response.data.status === 'success') {
        // Handle successful booking
        navigate('/home'); // Redirect to home page after booking
      } else {
        setError('Error booking desk. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Book Desk</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="deskId" className="form-label">Desk ID</label>
          <input 
            type="text" 
            className="form-control" 
            id="deskId" 
            value={deskId} 
            onChange={(e) => setDeskId(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input 
            type="date" 
            className="form-control" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">Time</label>
          <input 
            type="time" 
            className="form-control" 
            id="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Book Desk</button>
      </form>
    </div>
  );
}

export default BookDesk;
