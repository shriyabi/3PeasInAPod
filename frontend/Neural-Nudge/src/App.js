import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import SignIn from './components/Sign-In';

function App() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-primary justify-center flex items-start flex-col"> 
      <div className="text-white w-full h-1/3 mt-5" >
          <h2 className="text-ternary text-3xl text-center font-bold p-5"> Welcome to NeuralNudge </h2>
      </div>
      <div className="text-white item-center flex justify-center w-full h-2/3">
        <div className="w-3/4 rounded-lg bg-secondary pt-3 h-3/4 w-4/5 flex flex-col items-center">
          <h2 className="text-xl mt-8 text-quadary overline font-semibold"> Sign In</h2>
          <form className='flex justify-center flex-col items-start h-3/4 px-3 w-full'>
            <label className="text-sm pb-1"> Email </label>
            <input placeholder='Email' className="rounded-sm px-3 border-shadow w-full"/>
            <label className="text-sm pb-1 pt-5"> Password </label>
            <input placeholder='Password' className="rounded-sm px-3 border-shadow w-full"/>
          </form>
          <div className="bg-quadary flex flex-row justify-center items-center rounded-b-lg w-full h-1/4">
              <SignIn/>
              <SignIn/>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default App;
