import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Setting() {

    return (
        <div className="w-screen h-screen bg-primary flex items-center justify-center flex-col">
          <div className="w-full h-[85vh] flex items-center justify-center flex-col">
            <h2 class="pb-10 px-5 text-ternary text-center"> Press the button to communicate with Big Green Brother </h2>
            
            <button
              className={`w-[10em] h-[10em] p-5 flex justify-center items-center rounded-3xl`}
            >
             
              
            </button> 
            
          </div>
          <div className="w-full h-[15vh] bg-quadary flex-row flex justify-center items-center">
            <button className="w-[3em] h-[3em] icons m-8 hover:text-secondary">
              
            </button>
            <button className="w-[3em] h-[3em] icons m-8">
             
            </button>
            <button className="w-[3em] h-[3em] icons m-8">
              
            </button>
          </div>
        </div>
      );
}

export default Setting;
