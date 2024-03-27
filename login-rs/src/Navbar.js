import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [auth, setAuth] = useState(null); // Change initial state to null
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    axios.get('http://localhost:8801/', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
        setLoading(false); // Update loading state after fetching auth status
      })
      .catch(err => {
        console.error('Error fetching auth status:', err);
        setAuth(false);
        setLoading(false); // Update loading state after fetching auth status
      });
  }, []); // Remove auth from dependency array to prevent infinite loop

  const handleLogout = () => {
    axios.get('http://localhost:8801/logout', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          navigate('/signin');
          setTimeout(() => window.alert('You have logged out'), 100); 
        } else {
          console.error('Logout failed:', res.data.Error || 'Unknown error');
        }
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  // Render null if authentication status is not yet determined or if not authenticated
  if (loading || !auth || location.pathname === '/signin') {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">Your App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {auth ? (
              <li className="nav-item">
                <button className="btn btn-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
