import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import './index.css';
import App from './App';
import Home from './Dashboard'; 
import Settings from './Settings'; 
import reportWebVitals from './reportWebVitals';
import Privacy from './Privacy';
import Temp from './Temp';

// Set the app element for react-modal
Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename="/">
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/temp" element={<Temp />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();