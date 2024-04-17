import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [desks, setDesks] = useState([]);

  useEffect(() => {
    fetchDesks();
  }, []);

  const fetchDesks = async () => {
    try {
      const response = await fetch('http://localhost:3001/desks'); // Change the URL accordingly
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

  const { username, email, avatar } = location.state;

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
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
      <ul>
        {desks.map(desk => (
          <li key={desk._id}>{desk.name} - {desk.location}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
