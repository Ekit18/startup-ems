
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleIcon } from '../ui/icons';

function GoogleAuth() {
  function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: `http://localhost:3000/login/google/redirect`,
      client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    return `${rootUrl}?${new URLSearchParams(options).toString()}`;
  }


  return (
    <div>
      <a href={getGoogleAuthURL()}><GoogleIcon /></a>
    </div>
  )
}
export default GoogleAuth
