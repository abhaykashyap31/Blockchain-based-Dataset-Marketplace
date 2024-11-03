// LoginPage.js
import React, { useState } from 'react';
import './SignupLoginPage.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../Firebase/FirebaseAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(Auth,email,password);
      alert("Login Successful");
      navigate('/');
    }catch(error){
    alert(error.message);

    }
  };

  return (
    <div className="signup-login-container">
      <div className="signup-login-card">
        <h1 className="signup-login-title">LOGIN</h1>
        
        <form onSubmit={handleLoginSubmit} className="signup-login-form">
          <div className="signup-login-input-group">
            <label htmlFor="email" className="signup-login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-login-input"
              required
            />
          </div>
          
          <div className="signup-login-input-group">
            <label htmlFor="password" className="signup-login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-login-input"
              required
            />
          </div>
          
          <button
            type="submit"
            className="signup-login-submit-button"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
