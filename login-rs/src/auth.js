import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useAuthentication() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8801/', { withCredentials: true })
      .then(res => {
        console.log(res.data); 
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.firstName);
          setLastName(res.data.lastName);
        } else {
          
        }
      })
      .catch(err => {
        setTimeout(() => window.alert('You must be logged in to access your Dashboard or create an account.'), 60); 
        navigate('/signin');
      });
  }, []);

  return { auth, name, lastName };
}

export default useAuthentication;
