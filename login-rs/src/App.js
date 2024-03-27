import React from 'react';
import './App.css';
import Login from './login';
import Home from './Home'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Navbar from './Navbar';

import Signin from './signin';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
