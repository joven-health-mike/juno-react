// Copyright 2022 Social Fabric, LLC

import React, { useCallback, useContext, useEffect } from 'react';
import { Settings } from 'luxon';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { LoggedInUserContext, UsersContext } from '../data/users';
import { AvailableRoute } from '../auth/permissions';
import { AvailableRoutes, isRouteAllowed } from './AppRouter';
import { AppointmentsContext } from '../data/appointments';
import { SchoolsContext } from '../data/schools';
import { h1Styles } from '../components/styles/mixins';

const Header = styled.h1`
  ${h1Styles}
`;

const Container = styled.div`
  margin-left: 250px;
`;

const PrivateRoutes = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const role = loggedInUser.role;
  Settings.defaultZone = loggedInUser.timeZoneIanaName || 'America/Denver';

  const { getAll: getUsers } = useContext(UsersContext);
  const { getAll: getAppointments } = useContext(AppointmentsContext);
  const { getAll: getSchools } = useContext(SchoolsContext);
  const { data: users } = useContext(UsersContext);

  useEffect(() => {
    getAppointments();
    getSchools();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isRouteAllowedForUser = useCallback(
    (route: AvailableRoute) => isRouteAllowed(route, role, users),
    [users, role]
  );

  return (
    // allow available routes based on user permissions
    <Routes>
      <>
        {AvailableRoutes.map((route, index) => {
          return (
            isRouteAllowedForUser(route.url as AvailableRoute) && (
              <Route
                key={index}
                path={route.url}
                element={<Container>{route.element}</Container>}
              />
            )
          );
        })}
        <Route path="*" element={<Header>404 - Not Found</Header>} />
      </>
    </Routes>
  );
};

export default PrivateRoutes;
