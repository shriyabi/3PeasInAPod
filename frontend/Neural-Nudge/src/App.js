import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      const defaultUserData = {
        user: {
          id: Date.now(),
          first_name: '',
          last_name: '',
        },
        settings: {
          speed: 5,
          positivity: 5,
          sadness: 5,
          aggressiveness: 5,
        },
      };
      setUserData(defaultUserData);
      localStorage.setItem('userData', JSON.stringify(defaultUserData));
    }
  }, []);

  const handleInputChange = (field, value) => {
    if (!userData) return;
    const updatedUserData = {
      ...userData,
      user: {
        ...userData.user,
        [field]: value,
      },
    };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleSubmit = () => {
    if (!userData) return;
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const navigateToPrivacy = () => {
    navigate('/privacy');
  };

  if (!userData) return null;

  return (
    <div className="w-screen h-screen bg-primary justify-center flex items-start flex-col"> 
      <div className="text-white w-full h-1/3 mt-5">
        <h2 className="text-ternary text-3xl text-center font-bold p-5">Green Brother Welcomes You</h2>
      </div>
      <div className="text-white flex-col items-center flex justify-start w-full h-2/3">
        <div className="w-3/4 md:w-1/3 rounded-lg bg-quadary pt-3 h-3/5 flex flex-col items-center">
          <h2 className="text-base px-2 italic text-primary text-center font-semibold">Please input your first and last name</h2>
          <form className='flex justify-center flex-col items-start h-3/4 px-3 w-full'>
            <label htmlFor="firstName" className="text-sm pb-1 m-0">First Name</label>
            <input
              id="firstName"
              type="text"
              value={userData.user.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              placeholder='First Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
            <label htmlFor="lastName" className="text-sm pb-1 pt-5">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={userData.user.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              placeholder='Last Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
          </form>
          <div className="bg-secondary flex flex-row justify-center items-center rounded-b-lg w-full h-1/4">
            <button 
              onClick={handleSubmit} 
              className="border-2 rounded-xl px-3 my-5 bg-primary text-ternary"
            >
              Submit
            </button> 
          </div>
        </div> 
        <button onClick={navigateToPrivacy}>
          <h2 className="pt-2 px-3 text-center text-ternary text-xs"> 
            By using our services, you consent to the terms of this <span className="underline">Privacy Policy</span>. 
          </h2>
        </button>
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
    // Store first name and last name in local storage
    localStorage.setItem('first_name', JSON.stringify(firstName));
    localStorage.setItem('last_name', JSON.stringify(lastName));
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const priv = () => {
    navigate('/privacy');
  };

  return (
    <div className="w-screen h-screen bg-primary justify-center flex items-start flex-col"> 
      <div className="text-white w-full h-1/3 mt-5">
        <h2 className="text-ternary text-3xl text-center font-bold p-5"> Green Brother Welcomes You </h2>
      </div>
      <div className="text-white flex-col items-center flex justify-start w-full h-2/3">
        <div className="w-3/4 rounded-lg bg-quadary pt-3 h-3/5 flex flex-col items-center">
          <h2 className="text-base px-2 italic text-primary text-center font-semibold">Please input your first and last name</h2>
          <form className='flex justify-center flex-col items-start h-3/4 px-3 w-full'>
            <label htmlFor="firstName" className="text-sm pb-1 m-0"> First Name </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
            <label htmlFor="lastName" className="text-sm pb-1 pt-5"> Last Name </label>
            <input
              id="lastName"
              type="text"
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
        <button onClick={priv}>
          <h2 className="pt-2 px-3 text-center text-ternary text-xs"> 
            By using our services, you consent to the terms of this <span className="underline">Privacy Policy</span>. 
          </h2>
        </button>
      </div>
    </div>
  );
}

export default App;
 */