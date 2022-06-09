import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';

const PublicRoutes = () => {
  return (
    <Routes>
      {/* this empty route has to be here for auth to complete */}
      <Route path="/" element={<></>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;
