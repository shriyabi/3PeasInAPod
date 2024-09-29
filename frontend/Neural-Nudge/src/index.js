import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Dashboard'; 
import Settings from './Settings'; 
import Navbar from './components/Navbar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Navbar />
    </div>
  </Router>
);

reportWebVitals();
