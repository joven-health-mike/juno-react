// Copyright 2022 Social Fabric, LLC

import React from 'react';
import '@fullcalendar/react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //  if there are no query parameters, redirect to login page
  if (!location.search) {
    navigate('/login');
  }

  return <></>;
};

export default AuthPage;
