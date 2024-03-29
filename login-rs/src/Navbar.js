import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:8801/', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching auth status:', err);
        setAuth(false);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8801/logout', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          navigate('/signin');
          window.alert('You have logged out')
        } else {
          console.error('Logout failed:', res.data.Error || 'Unknown error');
        }
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  if (loading || auth === null) {
    return null; // Render nothing until authentication status is determined
  }

  return (
    <nav className="navbar navbar-expand-lg d-flex justify-content-center" style={{ backgroundColor: '#004d6e' }}>
      <div className="container-fluid">
        <a className="navbar-brand" aria-current="page" href="/home" style={{ color: 'white', fontSize: '20px' }}>Placeholder</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="sidebar offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1 pe-1">
              
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="/Dashboard" style={{ color: 'white', fontSize: '20px' }}>Dashboard</a>
              </li>
              <li className="nav-item dropdown order-lg-last"> {/* Move the "Account" dropdown to the right */}
                <a className="nav-link dropdown-toggle text-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/login">Register</a></li>
                  <li><a className="dropdown-item " href="/">Sign in</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Posts
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/Post">Create Posts</a></li>
                  <li><a className="dropdown-item " href="/Posts">Current Posts</a></li>
                  
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
