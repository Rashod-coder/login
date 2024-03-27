// Home.js
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8801/', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error || 'Unauthorized');
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setMessage('You must be logged in' + err.message);
        navigate('/')
      });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8801/logout', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          setName('');
        } else {
          setMessage(res.data.Error || 'Logout failed');
        }
      })
      .catch(err => {
        console.error('Error logging out:', err);
        setMessage('An error occurred while logging out: ' + err.message);
      });
  };

  return (
    <div className='container mt-4'>
      <h1>Welcome to the site</h1>
      {auth ? (
        <div>
          <h2>You are logged in!</h2>
          <p>Your name: {name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>{message || 'Please log in to continue.'}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
