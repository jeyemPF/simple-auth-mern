// client/Home.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BookingHistory from './BookingHistory'; // Import BookingHistory component

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [desks, setDesks] = useState([]);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    fetchDesks();
  }, []);

  const fetchDesks = async () => {
    try {
      const response = await fetch('http://localhost:3001/desks');
      if (response.ok) {
        const data = await response.json();
        setDesks(data);
      } else {
        console.error('Failed to fetch desks');
      }
    } catch (error) {
      console.error('Error fetching desks:', error);
    }
  };

  if (!location.state) {
    // Redirect to login page if state is undefined or null
    navigate('/login');
    return null;
  }

  const { username, email, avatar, userId } = location.state; // Extract userId from location state

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  const handleBookDesk = (desk) => {
    setSelectedDesk(desk);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBookingDetails({
      date: '',
      time: '',
    });
  };

  const handleBookingConfirm = async () => {
    try {
      const response = await fetch('http://localhost:3001/book-desk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deskId: selectedDesk._id,
          bookingDetails,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Booking successful:', data);
        // Update UI to reflect booking status (optional)
      } else {
        console.error('Booking failed');
      }
    } catch (error) {
      console.error('Error booking desk:', error);
    }
    setShowModal(false);
    setBookingDetails({
      date: '',
      time: '',
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Welcome, {username}!</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
      <p>{email}</p>
      {avatar && (
        <img
          src={avatar}
          alt="Avatar"
          className="img-fluid rounded-circle"
          style={{ width: '100px', height: '100px' }}
        />
      )}
      <h3>Available Desks:</h3>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {desks.map((desk) => (
          <div key={desk._id} className="col">
            <div className="card" onClick={() => handleBookDesk(desk)} style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">{desk.name}</h5>
                <p className="card-text">Location: {desk.location}</p>
                <p className="card-text">Available: {desk.available ? 'Yes' : 'No'}</p>
                <p className="card-text">Bookings: {desk.bookingsCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Desk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={bookingDetails.date}
                onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                value={bookingDetails.time}
                onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBookingConfirm}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pass userId to BookingHistory component */}
      <BookingHistory userId={userId} />
    </div>
  );
}

export default Home;
