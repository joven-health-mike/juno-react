import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../components/pages/AuthPage';
import LoginPage from '../components/pages/LoginPage';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;
