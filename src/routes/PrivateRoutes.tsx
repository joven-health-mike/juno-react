import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import AppointmentsPage from '../components/pages/AppointmentsPage';
import CalendarPage from '../components/pages/CalendarPage';
import CounselorsPage from '../components/pages/CounselorsPage';
import SchoolsPage from '../components/pages/SchoolsPage';
import StudentsPage from '../components/pages/StudentsPage';
import UsersPage from '../components/pages/UsersPage';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/counselors" element={<CounselorsPage />} />
      <Route path="/schools" element={<SchoolsPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/logout" element={<RedirectToLogoutPage />} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

const RedirectToLogoutPage: React.FC = () => {
  window.location.href = process.env.REACT_APP_SERVER_URL + '/logout';
  return <></>;
};

export default PrivateRoutes;
