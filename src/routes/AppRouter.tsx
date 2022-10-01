// Copyright 2022 Social Fabric, LLC

import React from 'react';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import HomePage from '../components/pages/HomePage';
import AppointmentsPage from '../components/pages/AppointmentsPage';
import CalendarPage from '../components/pages/CalendarPage';
import CounselorsPage from '../components/pages/CounselorsPage';
import SchoolsPage from '../components/pages/SchoolsPage';
import StudentsPage from '../components/pages/StudentsPage';
import UsersPage from '../components/pages/UsersPage';

interface IAppRouterParams {
  isAuthenticated: boolean;
}

const AppRouter: React.FC<IAppRouterParams> = ({ isAuthenticated }) => {
  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

const RedirectToLogoutPage: React.FC = () => {
  window.location.href = 'https://localhost/api/1/logout';
  return <></>;
};

export type AvailableRoute =
  | '/'
  | '/appointments'
  | '/calendar'
  | '/counselors'
  | '/schools'
  | '/students'
  | '/users'
  | '/logout';

export const AvailableRoutes = [
  { url: '/', element: <HomePage /> },
  { url: '/appointments', element: <AppointmentsPage /> },
  { url: '/calendar', element: <CalendarPage /> },
  { url: '/counselors', element: <CounselorsPage /> },
  { url: '/schools', element: <SchoolsPage /> },
  { url: '/students', element: <StudentsPage /> },
  { url: '/users', element: <UsersPage /> },
  { url: '/logout', element: <RedirectToLogoutPage /> },
];

export default AppRouter;
