/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppointmentsPage from '../components/pages/AppointmentsPage';
import CalendarPage from '../components/pages/CalendarPage';
import CounselorsPage from '../components/pages/CounselorsPage';
import LoginPage from '../components/pages/LoginPage';
import LogoutPage from '../components/pages/LogoutPage';
import HomePage from '../components/pages/HomePage';
import SchoolsPage from '../components/pages/SchoolsPage';
import StudentsPage from '../components/pages/StudentsPage';
import UsersPage from '../components/pages/UsersPage';
import AccountDetailPage from '../components/pages/AccountDetailPage';
import { User } from '../data/users';

type AppRouterProps = {
  isLoggedIn: boolean;
  loggedInUser: User;
  role: string;
};

const AppRouter: React.FC<AppRouterProps> = ({
  isLoggedIn,
  loggedInUser,
  role,
}) => {
  return (
    <Routes>
      {isLoggedIn && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/account"
            element={<AccountDetailPage defaultUser={loggedInUser} />}
          />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/counselors" element={<CounselorsPage />} />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </>
      )}
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/account" element={<Navigate replace to="/login" />} />
      <Route path="/appointments" element={<Navigate replace to="/login" />} />
      <Route path="/calendar" element={<Navigate replace to="/login" />} />
      <Route path="/counselors" element={<Navigate replace to="/login" />} />
      <Route path="/schools" element={<Navigate replace to="/login" />} />
      <Route path="/students" element={<Navigate replace to="/login" />} />
      <Route path="/users" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
