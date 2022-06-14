import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<RedirectToLoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const RedirectToLoginPage: React.FC = () => {
  window.location.href = 'http://localhost:8080/login';
  return <></>;
};

export default PublicRoutes;
