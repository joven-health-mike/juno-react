// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoggedInUserContext, UsersContext } from '../data/users';
import { pagePermission } from '../auth/permissions';
import { AvailableRoute, AvailableRoutes } from './AppRouter';
import { CounselorsContext } from '../data/counselors';
import { AppointmentsContext } from '../data/appointments';
import { SchoolsContext } from '../data/schools';
import { StudentsContext } from '../data/students';

const PrivateRoutes = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const role = loggedInUser.role;

  const { getAll: getUsers } = useContext(UsersContext);
  const { getAll: getCounselors } = useContext(CounselorsContext);
  const { getAll: getAppointments } = useContext(AppointmentsContext);
  const { getAll: getSchools } = useContext(SchoolsContext);
  const { getAll: getStudents } = useContext(StudentsContext);

  useEffect(() => {
    getAppointments();
    getCounselors();
    getSchools();
    getStudents();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
