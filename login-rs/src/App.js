import React from 'react';
import './App.css';
import Login from './login';
import Home from './Home'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate

import Signin from './signin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
