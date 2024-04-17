import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await axios.post('http://localhost:3001/login', { email, password });
      if (result.data.status === 'success') {
        const { username, email, avatar } = result.data.user; 
        navigate('/home', { state: { username, email, avatar } });
      } else {
        setError(result.data); // Display server error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.'); 
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <div className="text-danger">{error}</div>} {/* Display error message */}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
