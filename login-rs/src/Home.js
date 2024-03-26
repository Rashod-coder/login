import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  const [auth, setAuth] = useState(false); 
  const[message, setMessage] = useState('')
  const[email, setEmail] = useState('' )
  axios.defaults.withCredentials = true;


  // useEffect(() => {
  //   axios.post('http://localhost:8801')
  //     .then(res => {
  //       console.log('Response from server:', res); // Log the response object
  //       if (res.data.Status === "Success") {
  //         setAuth(true);
  //         setEmail(res.data.email);
  //       } else {
  //         setAuth(false);
  //         setMessage(res.data.Error);
  //       }
  //     })
  //     .catch(err => console.log(err)); // Fix the error handling here
  // }, []);
  

  return (
    <div className='container mt-4'>
      <h1>Welcome to the site</h1>
    </div>
  );
}

export default Home;
