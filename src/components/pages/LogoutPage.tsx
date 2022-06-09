// Copyright 2022 Social Fabric, LLC

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutPage: React.FC = () => {
  const { logout } = useAuth0();

  // log the user out as soon as this page loads
  useEffect(() => {
    logout();
  });

  return <></>;
};

export default LogoutPage;
