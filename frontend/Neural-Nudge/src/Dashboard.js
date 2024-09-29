import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from './home.png';
import analytics from './analytic-chart.png';
import App from './App.css';
import settings from './application-settings.png';
import on from './on-button.png';
import off from './on-off.png';

function Home() {
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const audioRef = useRef(new Audio());
  const [buttonRotation, setButtonRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState('animate__animated animate__flipInY');

  const navigate = useNavigate();

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
      interval = setInterval(captureAndConvert, 200);
    }
    return () => clearInterval(interval);
  }, [isCapturing && !isWaitingForResponse]);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      // Connect to WebSocket using the environment variable
      const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      ws.onopen = () => {
        console.log('WebSocket connected');

        if (userData) {
          const payload = {
            user: {
              id: userData.user.id,
              first_name: userData.user.first_name,
              last_name: userData.user.last_name,
            },
            settings: {
              speed: userData.settings.speed,
              anger: userData.settings.anger,
              curiosity: userData.settings.curiosity,
              positivity: userData.settings.positivity,
              surprise: userData.settings.surprise,
              sadness: userData.settings.sadness,
              aggressiveness: userData.settings.aggressiveness,
            }
          };
          const request = {
            type: "register",
            payload: payload
          }
          ws.send(JSON.stringify(request));
        }
      };
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setSocket(ws);
      setIsCapturing(true);
      setIsAnimating('animate__animated animate__rotateIn');
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
    setIsAnimating('animate__animated animate__flipInY');
    setSocket(null);
  };

  const captureAndConvert = async () => {
    if (!socket || isWaitingForResponse) return;
    setIsWaitingForResponse(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

    if (socket && socket.readyState === WebSocket.OPEN) {

      const payload = {
        image_b64: base64Image,
        timestamp: new Date().toISOString(),
        location: 'Unknown'
      };
      const request = {
        type: 'analysis',
        payload: payload
      };
      socket.send(JSON.stringify(request));

      try {
        const response = await waitForResponse();
        await handleAnalysisResponse(response);
      } catch (error) {
        console.error('Error handling response:', error);
      } finally {
        setIsWaitingForResponse(false);
      }
    } else {
      console.error('WebSocket is not connected');
      setIsWaitingForResponse(false);
      setSocket(null);
    }
  };

  const waitForResponse = () => {
    return new Promise((resolve, reject) => {
      socket.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      };
    });
  };

  const handleAnalysisResponse = async (response) => {
    if (response.type !== 'analysis') {
      return;
    }
    const payload = response.payload;
    if (!payload.success) {
      console.log("Something really fucked up happened");
      console.log(response);
      throw new Error("Something really fucked up happened");
    }
    switch (payload.status) {
      case 'Received':
        console.log('Received');
        {
          const nextResponse = await waitForResponse();
          await handleAnalysisResponse(nextResponse);
        }
        break;
      case 'Rejected':
        console.log('Rejected');
        break;
      case 'Accepted':
        console.log('Accepted');
        {
          const nextResponse = await waitForResponse();
          await handleAnalysisResponse(nextResponse);
        }
        break;
      case 'No_Response':
        console.log('No_Response');
        break;
      case 'Responded':
        console.log('Responded');
        playAudio(payload.audio_b64);
        {
          const nextResponse = await waitForResponse();
          await handleAnalysisResponse(nextResponse);
        }
        break;
      case 'Groq_Response':
        console.log('Groq_Response');
        console.log(payload);
        break;
      default:
        console.log('Unknown response status:', payload.status);
        break;
    }
  };

  const playAudio = (base64Audio) => {
    const audioBlob = base64ToBlob(base64Audio, 'audio/mp3');
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;
    audioRef.current.play();
  };

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const toggleCapture = () => {
    if (isCapturing) {
      stopCapture();
    } else {
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
          className={`w-[10em] h-[10em] p-5 rounded-xl ${isCapturing === "True" ? 'bg-secondary' : 'bg-secondary'}`}
          onClick={toggleCapture}
        >
          <div className={`flex justify-center items-center ${isAnimating}`}>
            <img src={isCapturing ? off : on} />
          </div>
        </button>
        <video ref={videoRef} style={{ display: 'none' }} autoPlay />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div className="w-full h-[15vh] bg-quadary flex-row flex justify-center items-center">
        <button
          className="w-[3em] h-[3em] icons m-8 hover:text-secondary"
          onClick={() => navigate('/dashboard')}
        >
          <img src={home} alt="Home" />
          <h2 className="text-xs"> Home </h2>
        </button>
        <button
          className="w-[3em] h-[3em] icons m-8"
          onClick={() => navigate('/analytics')}
        >
          <img src={analytics} alt="Analytics" />
          <h2 className="text-xs"> Analytics </h2>
        </button>
        <button
          className="w-[3em] h-[3em] icons m-8"
          onClick={() => navigate('/settings')}
        >
          <img src={settings} alt="Settings" />
          <h2 className="text-xs"> Settings </h2>
        </button>
      </div>

    </div>
  );
}

export default Home;
