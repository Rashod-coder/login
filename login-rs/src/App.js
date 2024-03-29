import React from 'react';
import './App.css';
import Login from './login';
import Home from './Home'; 
import Dashboard  from './Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Navbar from './Navbar';

import Signin from './signin';
import Post from './Post';
import Posts from './Posts';

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
          <Route path="/Dashboard" element={<Dashboard />} /> 
          <Route path="/Post" element={<Post />} /> 
          <Route path="/Posts" element={<Posts />} /> 


        </Routes>
      </Router>
    </div>
  );
}

export default App;
