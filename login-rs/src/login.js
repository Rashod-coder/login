// Login.js
import React, { useState } from 'react'; // Import React and useState
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (event) => {
    // Update the corresponding input field in the state
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8801', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/');
          window.alert("Account Created");
        } else {
          window.alert("An unexpected error occurred."); 
        }
      })
      .catch(err => {
        if (err.response && err.response.data) {
          if (err.response.data.Error === "Email already exists") {
            window.alert("Email is in use please use a different email"); 
          } else {
            window.alert("An error occurred: " + (err.response.data.Error || "Please try again later."));
          }
        } else {
          // Handle cases where the error response is not available
          console.log(err); // For debugging
          window.alert("An error occurred, please try again later.");
        }
      });
  };
  

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} action="">
        <h1>Registration</h1>
        <div className='input-box'>
          <input type="text" placeholder='First Name' name="firstName" required onChange={handleChange} />
        </div>
        <div className='input-box'>
          <input type="text" placeholder='Last Name' name="lastName" required onChange={handleChange} />
        </div>
        <div className='input-box'>
          <input type="text" placeholder='Email' name="email" required onChange={handleChange} />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' name="password" required onChange={handleChange} />
        </div>
        <div className='input-box'>
          <a>Already have an account? <Link to="/signin">Sign in</Link></a>
        </div>
        <button type='submit'>Create Account</button>
      </form>
    </div>
  );
}

export default Login;
