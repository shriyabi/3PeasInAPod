import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleSignInButton() {
  const navigate = useNavigate(); // For route navigation after sign-in

  const handleCredentialResponse = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log("ID Token: " + googleUser.getAuthResponse().id_token);
    console.log("Full Name: " + profile.getName());
    console.log("Email: " + profile.getEmail());

    // Navigate to dashboard
    navigate('/dashboard');
  };

  useEffect(() => {
    // Load and initialize gapi
    const loadGapi = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '784258720680-hq4olvj0blr0mq0in5210vq9j2dodktg.apps.googleusercontent.com', // Replace with your actual Client ID
        }).then(() => {
          // Render the Google Sign-In button
          window.gapi.signin2.render('signInDiv', {
            scope: 'profile email',
            width: 240,
            height: 50,
            longtitle: true,
            theme: 'dark',
            onsuccess: handleCredentialResponse,
          });
        });
      });
    };

    // Check if gapi is available
    if (window.gapi) {
      loadGapi();
    } else {
      console.error('gapi not loaded');
    }

    // Cleanup on component unmount
    return () => {
      // If necessary, perform any gapi-related cleanup
    };
  }, []);

  return <div id="signInDiv"></div>; // Div for Google Sign-In button
}

export default GoogleSignInButton;
