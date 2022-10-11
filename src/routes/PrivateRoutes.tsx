// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoggedInUserContext } from '../data/users';
import { pagePermission } from '../data/permissions';
import { AvailableRoute, AvailableRoutes } from './AppRouter';

const PrivateRoutes = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const role = loggedInUser.role;

  function isRouteAllowed(route: AvailableRoute): boolean {
    return pagePermission(role, route);
  }

  return (
    // allow available routes based on user permissions
    <Routes>
      {AvailableRoutes.map((route, index) => {
        return (
          isRouteAllowed(route.url as AvailableRoute) && (
            <Route key={index} path={route.url} element={route.element} />
          )
        );
      })}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default PrivateRoutes;
