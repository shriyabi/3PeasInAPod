import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
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

  const handleInputChange = (field, value) => {
    const updatedUserData = {
      ...userData,
      user: {
        ...userData.user,
        [field]: value
      }
    };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleSliderChange = (setting, value) => {
    const updatedUserData = {
      ...userData,
      settings: {
        ...userData.settings,
        [setting]: parseInt(value)
      }
    };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/dashboard');
  };

  if (!userData) return null;

  return (
    <div className="w-screen h-screen bg-primary flex items-center justify-center flex-col">
      <div className="w-full h-[85vh] flex items-center justify-center flex-col overflow-y-auto">
        <h2 className="text-quadary text-3xl text-center font-bold p-5">Settings</h2>
        <div className="w-[90vw] rounded-lg bg-ternary pt-3 h-4/5 flex flex-col items-center overflow-y-auto">
          <div className="w-full px-5 py-3">
            <label className="text-primary text-sm pb-1"> Reset First Name</label>
            <input
              type="text"
              value={userData.user.first_name}
              placeholder="Enter New First Name"
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              className="w-full rounded-sm px-3 py-2 text-primary"
            />
          </div>
          <div className="w-full px-5 py-3">
            <label className="text-primary text-sm pb-1"> Reset Last Name</label>
            <input
              type="text"
              value={userData.user.last_name}
              placeholder="Enter New Last Name"
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              className="w-full rounded-sm px-3 py-2 text-primary"
            />
          </div>
          {Object.entries(userData.settings).map(([setting, value]) => (
            <div key={setting} className="w-full px-5 py-3">
              <label className="text-primary text-sm pb-1 capitalize">{setting}</label>
              <input
                type="range"
                min="0"
                max="10"
                value={value}
                onChange={(e) => handleSliderChange(setting, e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-primary text-xs">
                <span>0</span>
                <span>{value}</span>
                <span>10</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-5 bg-secondary text-primary font-bold py-2 px-4 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;