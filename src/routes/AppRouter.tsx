/* eslint-disable no-unused-vars */
import React from 'react';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRouter: React.FC = () => {
  const isAuthenticated = true; // TODO: how to check if user is authenticated?
  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default AppRouter;
