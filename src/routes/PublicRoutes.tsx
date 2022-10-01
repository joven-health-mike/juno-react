// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { redirectTo, SERVER_API_URL } from '../services/http-common';

const PublicRoutes = () => {
  return (
    // when not logged in, all routes redirect to login page.
    <Routes>
      <Route path="/login" element={<RedirectToLoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const RedirectToLoginPage: React.FC = () => {
  redirectTo(window, SERVER_API_URL + '/login');
  return <></>;
};

export default PublicRoutes;
