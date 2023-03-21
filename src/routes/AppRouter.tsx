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
import TeachersPage from '../components/pages/TeachersPage';
import UsersPage from '../components/pages/UsersPage';
import AccountDetailPage from '../components/pages/AccountDetailPage';
import { AvailableRoute, pagePermission } from '../auth/permissions';
import { getActiveTeachers } from '../data/teachers';
import { User } from '../data/users';
import { Role } from '../services/user.service';
import EosrPage from '../components/pages/EosrPage';

interface IAppRouterParams {
  isAuthenticated: boolean;
}

const AppRouter: React.FC<IAppRouterParams> = ({ isAuthenticated }) => {
  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};

const RedirectToLogoutPage: React.FC = () => {
  window.location.href =
    process.env.REACT_APP_SERVER_BASE_URL + '/api/1/logout';
  return <></>;
};

export const AvailableRoutes = [
  { url: '/', element: <HomePage /> },
  { url: '/account', element: <AccountDetailPage /> },
  { url: '/appointments', element: <AppointmentsPage /> },
  { url: '/calendar', element: <CalendarPage /> },
  { url: '/counselors', element: <CounselorsPage /> },
  { url: '/schools', element: <SchoolsPage /> },
  { url: '/students', element: <StudentsPage /> },
  { url: '/teachers', element: <TeachersPage /> },
  { url: '/users', element: <UsersPage /> },
  { url: '/logout', element: <RedirectToLogoutPage /> },
  { url: '/eosr', element: <EosrPage /> },
];

export const isRouteAllowed = (
  route: AvailableRoute,
  role: Role,
  users: User[]
): boolean => {
  if (route === '/teachers') {
    const teachers = getActiveTeachers(users);
    const teachersExist = teachers.length > 0;
    const teacherRouteAllowed =
      role === 'SYSADMIN' || (route === '/teachers' && teachersExist);
    return teacherRouteAllowed && pagePermission(role, route);
  }

  if (route === '/eosr') {
    // only show EoSR page for counselors & SYSADMINs
    const eosrRouteAllowed = role === 'COUNSELOR' || role === 'SYSADMIN';
    return eosrRouteAllowed && pagePermission(role, route);
  }

  return pagePermission(role, route);
};

export default AppRouter;
