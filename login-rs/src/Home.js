import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  const [auth, setAuth] = useState(false); 
  const[message, setMessage] = useState('')
  const[email, setEmail] = useState('' )
  axios.defaults.withCredentials = true;


  useEffect(() => {
    axios.post('http://localhost:8801')
      .then(res => {
        console.log('Response from server:', res); // Log the response object
        if (res.data.Status === "Success") {
          setAuth(true);
          setEmail(res.data.email);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err)); // Fix the error handling here
  }, []);
  

  return (
    <div className='container mt-4'>
      {auth ? (
        <div>
          <h3>Welcome to the site --- {email}</h3>
          {/* <button className='btn btn-danger' onClick={handleLogout}>Logout</button> */}
        </div>
      ) : (
        <div>
          <h3>8</h3>
        </div>
      )}
    </div>
  );
}

export default Home;
