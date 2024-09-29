import React from 'react';
import { Link } from 'react-router-dom';
import home from '../home.png';
import analytics from '../analytic-chart.png';
import settings from '../application-settings.png';

function Navbar() {
  return (
    <div className="w-full h-[15vh] bg-quadary flex-row flex justify-center items-center fixed bottom-0">
      <Link to="/dashboard" className="w-[3em] h-[3em] icons m-8 hover:text-secondary">
        <img src={home} alt="Home" />
        <h2 className="text-xs">Home</h2>
      </Link>
      <Link to="/analytics" className="w-[3em] h-[3em] icons m-8 hover:text-secondary">
        <img src={analytics} alt="Analytics" />
        <h2 className="text-xs">Analytics</h2>
      </Link>
      <Link to="/settings" className="w-[3em] h-[3em] icons m-8 hover:text-secondary">
        <img src={settings} alt="Settings" />
        <h2 className="text-xs">Settings</h2>
      </Link>
    </div>
  );
}

export default Navbar;