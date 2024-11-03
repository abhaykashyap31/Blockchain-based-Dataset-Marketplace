import React, { useState } from 'react';
import './SignupLoginPage.css';

const SignupLoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="signup-login-container">
      <div className="signup-login-card">
        <h1 className="signup-login-title">
          {isSignup ? 'SIGN UP' : 'LOGIN'}
        </h1>
        <form onSubmit={handleSubmit} className="signup-login-form">
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
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className="signup-login-toggle">
          <button
            type="button"
            onClick={toggleSignup}
            className="signup-login-toggle-button"
          >
            {isSignup
              ? 'Already have an account? Log In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupLoginPage;