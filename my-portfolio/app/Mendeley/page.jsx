'use client'

import React, { useEffect } from 'react';
import { Button } from "antd";

export const Login = () => {
    const authorize = () => {
        const clientId = process.env.REACT_APP_MENDELEY_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_REDIRECT_URL;
        const state = process.env.REACT_APP_MENDELEY_STATE;

        const authUrl = `https://api.mendeley.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=all&state=${state}`;
        window.location.href = authUrl;
    };

    return (
        <div>
            <h1>This application is inteded to speed up the  </h1>
            <Button onClick={authorize}>Login with Mendeley</Button>
        </div>
    );
};

export default Login;
