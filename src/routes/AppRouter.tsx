/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  console.log('isAuthenticated:', isAuthenticated);

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default AppRouter;
