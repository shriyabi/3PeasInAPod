import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import GoogleSignInButton from './components/Sign-In';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    // Perform validation or submission here
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
          <form className='flex justify-center flex-col items-start h-3/4 px-3 w-full'>
            <label htmlFor="email" className="text-sm pb-1 m-0"> First Name </label>
            <input
              id="email"
              type="name"
              value={email}
              onChange ={(e) => setEmail(e.target.value)}
              placeholder='First Name'
              className="rounded-sm px-3 border-shadow w-full"
            />
            <label htmlFor="password" className="text-sm pb-1 pt-5"> Last Name </label>
            <input
              id="password"
              type="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

/*import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import GoogleSignInButton from './components/Sign-In';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    // Perform validation or submission here
    navigate('/dashboard');
  };

  return (
    <div className="w-screen h-screen bg-primary justify-center flex items-start flex-col"> 
      <div className="text-white w-full h-1/3 mt-5">
        <h2 className="text-ternary text-3xl text-center font-bold p-5"> Welcome to NeuralNudge </h2>
      </div>
      <div className="text-white item-center flex justify-center w-full h-2/3">
        <div className="w-3/4 rounded-lg bg-quadary pt-3 h-3/4 flex flex-col items-center">
          <h2 className="text-xl mt-8 text-primary overline font-semibold"> Sign In</h2>
          <form className='flex justify-center flex-col items-start h-3/4 px-3 w-full'>
            <label htmlFor="email" className="text-sm pb-1"> Email </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange ={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className="rounded-sm px-3 border-shadow w-full"
            />
            <label htmlFor="password" className="text-sm pb-1 pt-5"> Password </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className="rounded-sm px-3 border-shadow w-full"
            />
          </form>
          <button 
            onClick={handleClick} 
            className="border-2 rounded-xl px-3 my-5 bg-primary text-ternary"
          >
            Submit
          </button> 
          <div className="bg-secondary flex flex-row justify-center items-center rounded-b-lg w-full h-1/4">
            <div className="h-[3em] w-[3em]"></div>
            <GoogleSignInButton />
          </div>
        </div> 
      </div>
    </div>
  );
}

export default App;
 */
