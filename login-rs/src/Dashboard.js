import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Use the same CSS file for both login and signin pages for consistent styling.
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS



function Dashboard() {
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
          setName(res.data.firstName); // Corrected from res.data.name
          setLastName(res.data.lastName);
          
        } else {
          setTimeout(() => window.alert('You must be logged in to access your Dashboard or create an account.'), 60); 
        }
      })
      .catch(err => {
        setTimeout(() => window.alert('You must be logged in to access your Dashboard or create an account.'), 60); 
        navigate('/signin');
        
      });
  }, []);

  

  if (!auth) {
    return null; 
  }

  return (
    <div className='container-fluid body'>
  <div className='row justify-content-start align-items-start vh-100'>
    <div className='col-sm-4'>
      <br/>
      <div className="dashboard-box">
        <h1>Welcome to your Dashboard {name} {lastName}</h1>
      </div>
    </div>
  </div>
</div>
  );
}

export default Dashboard;
