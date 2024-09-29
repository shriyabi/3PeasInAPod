import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import GoogleSignInButton from './components/Sign-In';

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from localStorage on component mount
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // Set default values if no data is stored
      const defaultUserData = {
        user: {
          id: Date.now(), // Generate a unique ID
          first_name: '',
          last_name: '',
        },
        settings: {
          // Add your default settings here
          speed: 5,
          anger: 5,
          curiosity: 5,
          positivity: 5,
          surprise: 5,
          sadness: 5,
          aggressiveness: 5,
        }
      };
      setUserData(defaultUserData);
      localStorage.setItem('userData', JSON.stringify(defaultUserData));
    }
  }, []);

  const updateUserData = (newData) => {
    const updatedUserData = { ...userData, ...newData };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user data and navigate to dashboard
    updateUserData({
      user: {
        ...userData.user,
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
      }
    });
    navigate('/dashboard');
  };

  return (
    <div className="w-screen h-screen bg-primary justify-center flex items-start flex-col"> 
      <div className="text-white w-full h-1/3 mt-5">
        <h2 className="text-ternary text-3xl text-center font-bold p-5"> Welcome to NeuralNudge </h2>
      </div>
      <div className="text-white item-center flex justify-center w-full h-2/3">
        <div className="w-3/4 rounded-lg bg-quadary pt-3 h-3/5 flex flex-col items-center">
          <h2 className="text-base px-2 italic text-primary text-center font-semibold">Please input your first and last name</h2>
          <form onSubmit={handleSubmit} className='flex justify-center flex-col items-start h-3/4 px-3 w-full'>
            <label htmlFor="firstName" className="text-sm pb-1 m-0"> First Name </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={userData?.user.first_name || ''}
              placeholder='First Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
            <label htmlFor="lastName" className="text-sm pb-1 pt-5"> Last Name </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={userData?.user.last_name || ''}
              placeholder='Last Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
            <div className="bg-secondary flex flex-row justify-center items-center rounded-b-lg w-full h-1/4 mt-5">
              <button 
                type="submit"
                className="border-2 rounded-xl px-3 my-5 bg-primary text-ternary"
              >
                Submit
              </button> 
            </div>
          </form>
        </div> 
      </div>
    </div>
  );
}

export default App;

/*import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import GoogleSignInButton from './components/Sign-In';

function App() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleClick = () => {
    // Perform validation or submission here
    navigate('/dashboard', { state: { firstName, lastName } });
  };

  return (
    <div className="w-screen h-screen bg-primary justify-center flex items-start flex-col"> 
      <div className="text-white w-full h-1/3 mt-5">
        <h2 className="text-ternary text-3xl text-center font-bold p-5"> Welcome to NeuralNudge </h2>
      </div>
      <div className="text-white item-center flex justify-center w-full h-2/3">
        <div className="w-3/4 rounded-lg bg-quadary pt-3 h-3/5 flex flex-col items-center">
          <h2 className="text-base px-2 italic text-primary text-center font-semibold">Please input your first and last name</h2>
          <form className='flex justify-center flex-col items-start h-3/4 px-3 w-full'>
            <label htmlFor="firstName" className="text-sm pb-1 m-0"> First Name </label>
            <input
              id="firstName"
              type="name"
              value={firstName}
              onChange ={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
            <label htmlFor="lastName" className="text-sm pb-1 pt-5"> Last Name </label>
            <input
              id="lastName"
              type="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
          </form>
          <div className="bg-secondary flex flex-row justify-center items-center rounded-b-lg w-full h-1/4">
          <button 
            onClick={handleClick} 
            className="border-2 rounded-xl px-3 my-5 bg-primary text-ternary"
          >
            Submit
          </button> 
          </div>
        </div> 
      </div>
    </div>
  );
}

export default App;
 */
