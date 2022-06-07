// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </>
  );
};

export default LoginPage;
