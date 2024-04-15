import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, password }; // Define formData
    axios.post('http://localhost:3001/register', formData)
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container">
      <h2>Register</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" value={name} 
            onChange={(e) => setName(e.target.value)} 
            />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" value={email} 
            onChange={ (e) => setEmail (e.target.value)} 
            />
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" value={password} 
            onChange={ (e) => setPassword (e.target.value)} 
            />
        </div>


        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="mt-3">Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default SignUp;
