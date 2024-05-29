import React, { useEffect } from 'react';
import axios from 'axios';

const Callback = () => {
  useEffect(() => {
    const fetchToken = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      const state = new URLSearchParams(window.location.search).get('state');
      const expectedState = process.env.REACT_APP_MENDELEY_STATE; 
      
      if (state !== expectedState) {
        console.error('State does not match');
        return;
      }

      const tokenUrl = 'https://api.mendeley.com/oauth/token';
      const data = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REACT_APP_REDIRECT_URL,
      });
      try {
        const response = await axios.post(tokenUrl, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: process.env.REACT_APP_MENDELEY_CLIENT_ID,
            password: process.env.REACT_APP_MENDELEY_STATE,
          },
        });
        localStorage.setItem('token', response.data.access_token);
        window.location.href = '/academicAssist';
      } catch (error) {
        console.error('Error fetching token', error);
      }
    };

    fetchToken();
  }, []);

  return <div>Loading...</div>;
};

export default Callback;