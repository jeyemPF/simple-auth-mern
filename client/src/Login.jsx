import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      const result = await axios.post('http://localhost:3001/login', { email, password });
      console.log(result);
      if (result.data.status === 'success') {
        const { username, email, avatar } = result.data.user; // Include avatar in destructuring
        // Redirect to home page and pass username, email, and avatar as query parameters
        navigate('/home', { state: { username: username, email: email, avatar: avatar } });
      } else {
        // Handle other cases like incorrect password or no record found
      }
    } catch (error) {
      console.error('Error:', error);
      setEmailError('An error occurred. Please try again.'); // Update email error message for general errors
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
          {emailError && <div className="text-danger">{emailError}</div>} {/* Display email error message */}
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
          {passwordError && <div className="text-danger">{passwordError}</div>} {/* Display password error message */}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
