import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

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
    </div>
  );
}

export default Home;
