// Login.js
import React, { useState } from 'react'; // Import React and useState
import axios from 'axios';
import './login.css';
import {Link, useNavigate} from 'react-router-dom'

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    // Update the corresponding input field in the state
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8801', values)
      .then(res => {
        if(res.data.Status === "Success"){
          navigate('/signin')
        }
        else{
          alert("Error")
        }
      })
      .catch(err => console.log(err)); // Fix the error handling here
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} action="">
        <h1>Registration</h1>
        <div className='input-box'>
          <input type="text" placeholder='Username' name="email" required onChange={handleChange} />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' name="password" required onChange={handleChange} />
        </div>
        <div className='input-box'>
          <label>
            <input type='checkbox' />
            Remember me
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
