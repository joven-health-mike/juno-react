// Copyright 2022 Social Fabric, LLC

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  // redirect to login page as soon as this page loads
  useEffect(() => {
    loginWithRedirect();
  });

  return <></>;
};

export default LoginPage;
