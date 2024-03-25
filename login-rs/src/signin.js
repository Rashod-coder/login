import React, { useState } from 'react';
import './login.css'; // Use the same CSS file for both login and signin pages for consistent styling.
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Define navigate function
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8801/signin', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err)); // Fix the error handling here
  };

  return (
    <div className="wrapper"> {/* Use the wrapper class for consistent styling */}
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="input-box">
          <input
            type="email"
            value={values.email} // Use values.email instead of email
            onChange={e => setValues({...values, email: e.target.value})}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            value={values.password} // Use values.password instead of password
            onChange={e => setValues({...values, password: e.target.value})}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
