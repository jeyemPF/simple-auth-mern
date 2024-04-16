import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const { username, email, avatar } = location.state; 
 

  return (
      <div className="container">
          <h2>Welcome, {username}!</h2>
          <p>Email: {email}</p>
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
