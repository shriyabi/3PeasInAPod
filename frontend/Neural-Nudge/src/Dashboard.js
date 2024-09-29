import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from './home.png';
import analytics from './analytic-chart.png';
import App from './App.css';
import settings from './application-settings.png'; 
import on from './on-button.png';
import off from './on-off.png';
import Animate from 'animate.css-react';
import 'animate.css/animate.min.css'; 

function Home() {
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
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

  useEffect(() => {
    let interval;
    if (isCapturing) {
      interval = setInterval(captureAndConvert, 500);
    }
    return () => clearInterval(interval);
  }, [isCapturing]);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      // Connect to WebSocket using the environment variable
      const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      ws.onopen = () => {
        console.log('WebSocket connected');
        setSocket(ws);

        if (userData) {
          const payload = {
            type: "register",
            payload: {
              user: {
                id: userData.user.id,
                first_name: userData.user.first_name,
                last_name: userData.user.last_name,
              },
                speed: userData.settings.speed,
                anger: userData.settings.anger,
                curiosity: userData.settings.curiosity,
                positivity: userData.settings.positivity,
                surprise: userData.settings.surprise,
                sadness: userData.settings.sadness,
                aggressiveness: userData.settings.aggressiveness,
            }
          };
          console.log(payload);
          ws.send(JSON.stringify(payload));
        }
      };
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setIsCapturing(true);
      setAnimationClass('animate__animated animate__rotateIn');
    } catch (err) {
      console.error("Error accessing camera or connecting to WebSocket:", err);
    }
  };

  const stopCapture = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    // Disconnect WebSocket
    if (socket) {
      socket.close();
      console.log('WebSocket disconnected');
    }

    setIsCapturing(false);
    setAnimationClass('animate__animated animate__flipInY');
    setSocket(null);
  };

  const captureAndConvert = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const base64Image = canvas.toDataURL('image/jpeg');

    // Send event with JSON payload
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'image',
        data: base64Image,
        timestamp: new Date().toISOString()
      };
      socket.send(JSON.stringify(payload));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  const toggleCapture = () => {
    if (isCapturing) {
      //setAnimationClass('animate__animated animate__rotateOut');
      stopCapture();
    } else {
     // setAnimationClass('animate__animated animate__rotateIn');
      startCapture();
    }
  };

  const updateUserData = (newData) => {
    const updatedUserData = { ...userData, ...newData };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  return (
    <div className="w-screen h-screen bg-primary flex items-center justify-center flex-col">
      <div className="w-full h-[85vh] flex items-center justify-center flex-col">
        <h2 class="pb-10 px-5 text-ternary text-center"> Press the button to communicate with Big Green Brother </h2>
        
        <button
          className={`w-[10em] h-[10em] rounded-xl ${isCapturing ? 'bg-secondary' : 'bg-quadary'}`}
          onClick={toggleCapture}
        >
          {isCapturing ? 'Stop' : 'Start'}
        </button>
        <video ref={videoRef} style={{ display: 'none' }} autoPlay />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div className="w-full h-[15vh] bg-quadary flex-row flex justify-center items-center">
        <button className="w-[3em] h-[3em] icons m-8">
          <img src={home} alt="Home" />
          <h2 className="text-xs"> Home </h2>
        </button>
        <button className="w-[3em] h-[3em] icons m-8">
          <img src={analytics} alt="Analytics" />
          <h2 className="text-xs"> Analytics </h2>
        </button>
        <button className="w-[3em] h-[3em] icons m-8">
          <img src={settings} alt="Settings" />
          <h2 className="text-xs"> Settings </h2>
        </button>
      </div>
    </div>
  );
}

export default Home;
