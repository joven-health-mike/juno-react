/* eslint-disable no-unused-vars */
import React from 'react';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

interface IAppRouterParams {
  isAuthenticated: boolean;
}

const AppRouter: React.FC<IAppRouterParams> = ({ isAuthenticated }) => {
  console.log(
    'User is ' + (isAuthenticated ? '' : ' not ') + 'authenticated...'
  );
  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

export default AppRouter;
