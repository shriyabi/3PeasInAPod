import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function SignIn() {
    
    const navigate = useNavigate();
    function renderGoogleButton() {
        const width = window.innerWidth;
        let size = 'large';
        if (width < 768) {
            size = 'small';
        } else if (width < 1024) {
            size = 'medium';
        }
        document.getElementById('signInDiv').innerHTML = '';
        window.google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: size }
        );
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "784258720680-hq4olvj0blr0mq0in5210vq9j2dodktg.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        renderGoogleButton();
    }, []);
       //success so navigate to dashbaord
       const handleCredentialResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        navigate('/Dashboard')
    }
    // Add an event listener for window resize
    window.addEventListener('resize', renderGoogleButton);
    return (
        <div className='flex items-center justify-center'>
            <div id="signInDiv" className="flex justify-center"> temp </div>
        </div>
    );
}

export default SignIn;