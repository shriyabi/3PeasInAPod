import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from './home.png';
import analytics from './analytic-chart.png';
import App from './App.css';
import settings from './application-settings.png'

function Home() {
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);

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

        const payload = {
          type: "register",
          payload: {
            user: {
              id: 69,
              first_name: 
              last_name:
            },
            settings: {

            }
          }
        };
        ws.send(JSON.stringify(payload));
      };
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setIsCapturing(true);
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
      stopCapture();
    } else {
      startCapture();
    }
  };

  return (
    <div className="w-screen h-screen bg-primary flex items-center justify-center flex-col">
      <div className="w-full h-[85vh] flex items-center justify-center flex-col">
        <button
          className={`w-[10em] h-[10em] rounded-xl ${isCapturing === 'Start' ? 'bg-secondary' : 'bg-quadary'}`}
          onClick={toggleCapture}
        >
          {isCapturing === 'Start' ? 'Stop' : 'Start'}
        </button>
        <video ref={videoRef} style={{ display: 'none' }} autoPlay />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div className="w-full h-[15vh] bg-quadary flex-row flex justify-center items-center">
        <button className="w-[3em] h-[3em] icons m-8">
          <img src={home} />
          <h2 className="text-xs"> Home </h2>
        </button>
        <button className="w-[3em] h-[3em] icons m-8">
          <img src={analytics} />
          <h2 className="text-xs"> Analytics </h2>
        </button>
        <button className="w-[3em] h-[3em] icons m-8">
          <img src={settings} />
          <h2 className="text-xs"> Settings </h2>
        </button>
      </div>
    </div>
  );
}

export default Home;
