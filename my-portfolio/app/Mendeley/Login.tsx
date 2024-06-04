"use client";

import React from "react";
import { Button } from "antd";

const Login: React.FC = () => {
  const authorize = () => {
    const clientId = process.env.NEXT_PUBLIC_MENDELEY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL;
    const state = process.env.NEXT_PUBLIC_MENDELEY_STATE;

    if (!clientId || !redirectUri || !state) {
      console.error("Missing environment variables");
      return;
    }

    const authUrl = `https://api.mendeley.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=all&state=${state}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <Button onClick={authorize}>Login with Mendeley</Button>
    </div>
  );
};

export default Login;
