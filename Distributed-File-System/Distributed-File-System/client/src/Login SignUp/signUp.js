// SignupPage.js
import React, { useState } from 'react';
import './SignupLoginPage.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth,db } from '../Firebase/FirebaseAuth';
import {doc, setDoc} from "firebase/firestore";
import { toast } from 'react-toastify';
import {ToastContainer} from "react-toastify";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try{
      await createUserWithEmailAndPassword(Auth,email,password);
      const user = Auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email : user.email,
          Username : name,

        });
      }
      alert("User successfully registered");
    } catch(error){
      alert(error.message);
      setEmail('');
      setName('');
      setConfirmPassword('');
      setPassword('');
    }
  }


  const handleChange = () => {
    navigate('/login');
  };

  return (
    
    <div className="signup-login-container">
      <div className="signup-login-card">
        <h1 className="signup-login-title">SIGN UP</h1>
        <form onSubmit={handleRegister} className="signup-login-form">
          <div className="signup-login-input-group">
            <label htmlFor="name" className="signup-login-label">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-login-input"
              required
            />
          </div>
          
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
          
          <div className="signup-login-input-group">
            <label htmlFor="confirm-password" className="signup-login-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="signup-login-input"
              required
            />
          </div>
          
          <button
            type="submit"
            className="signup-login-submit-button"
          >
            Sign Up
          </button>
          
          <button 
            type="button" 
            className="sign-to-login" 
            onClick={handleChange}
          >
            Already Have an Account? Login Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
