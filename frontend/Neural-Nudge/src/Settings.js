import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

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
          positivity: 5,
          sadness: 5,
          aggressiveness: 5,
          anger: 5,
          curiosity: 5,
          surprise: 5,
        },
      };
      setUserData(defaultUserData);
      localStorage.setItem('userData', JSON.stringify(defaultUserData));
    }
  }, []);

  const handleInputChange = (field, value) => {
    if (!userData) return; // Ensure userData is defined
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

  const handleSliderChange = (setting, value) => {
    if (!userData) return; // Ensure userData is defined
    const updatedUserData = {
      ...userData,
      settings: {
        ...userData.settings,
        [setting]: parseInt(value, 10),
      },
    };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleSave = () => {
    if (!userData) return; // Ensure userData is defined
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/dashboard');
  };

  if (!userData) return null; // Render nothing if userData is not defined

  // Labels and emojis for each setting
  const settingLabels = {
    speed: { label: ['Slow', 'Fast'], emoji: '🐢 / 🏎️' },
    positivity: { label: ['Negative', 'Positive'], emoji: '😞 / 😃' },
    sadness: { label: ['Happy', 'Sad'], emoji: '😊 / 😢' },
    aggressiveness: { label: ['Passive', 'Aggressive'], emoji: '😶‍🌫️ / 💢' },
  };

  return (
    <div className="w-screen h-screen bg-primary flex items-center justify-center flex-col">
      <div className="w-full h-[85vh] flex items-center justify-center flex-col overflow-y-auto">
        <h2 className="text-quadary text-3xl text-center font-bold p-5">Settings</h2>
        <div className="w-[85vw] rounded-lg bg-secondary pt-3 h-4/5 flex flex-col items-center overflow-y-auto">
          <div className="w-full px-5 py-3">
            <label className="text-primary text-base pb-1">First Name</label>
            <input
              type="text"
              value={userData.user.first_name}
              placeholder={userData.user.first_name || "Enter New First Name"}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              className="w-full border-2 text-base rounded-md px-3 text-primary"
            />
          </div>
          <div className="w-full px-5 pb-5">
            <label className="text-primary text-base pb-1">Last Name</label>
            <input
              type="text"
              value={userData.user.last_name}
              placeholder="Enter New Last Name"
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              className="w-full border-2 rounded-md px-3 text-primary"
            />
          </div>
          {Object.entries(userData.settings)
            .filter(([setting]) => settingLabels[setting]) // Filter out unknown settings
            .map(([setting, value]) => {
              const { label, emoji } = settingLabels[setting];
              return (
                <div key={setting} className="w-full px-5 py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-primary text-xs flex items-center">
                      {label[0]} {emoji.split(' / ')[0]}
                    </span>
                    <span className="text-primary text-xs flex items-center">
                      {label[1]} {emoji.split(' / ')[1]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={value}
                    onChange={(e) => handleSliderChange(setting, e.target.value)}
                    className="w-full appearance-none h-4 rounded-lg cursor-pointer bg-ternary"
                    style={{
                      background: `linear-gradient(to right, #D1FAE5 ${value * 10}%, #D1D5DB ${value * 10}%)`,
                    }}
                  />
                  <div className="flex justify-between text-primary text-xs">
                    <span></span>
                    <span>{}</span>
                    <span></span>
                  </div>
                </div>
              );
            })}
        </div>
        <button
          onClick={handleSave}
          className="mt-5 bg-quadary text-primary font-bold py-2 px-4 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
