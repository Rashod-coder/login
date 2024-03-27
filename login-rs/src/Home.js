import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8801/', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          <h1>Login Success</h1>
          setAuth(true);
          setName(res.data.name);
        } else {
          throw new Error('Unauthorized'); 
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        navigate('/signin');
        setTimeout(() => window.alert('You must be logged in to continue.'), 60); 
      });
  }, []); 

  const handleLogout = () => {
    axios.get('http://localhost:8801/logout', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          setName('');
          navigate('/signin');
          setTimeout(() => window.alert('You have logged out please sign in to continue.'), 100); 

        } else {
          console.error('Logout failed:', res.data.Error || 'Unknown error');
        }
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  if (!auth) {
    return null; 
  }

  return (
    <div className='container mt-4'>
      <h1>Welcome to the site</h1>
      <div>
        <h2>You are logged in!</h2>
        <p>Your name: {name}</p>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </div>
  );
}

export default Home;
