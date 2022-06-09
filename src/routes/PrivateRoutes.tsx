import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import AppointmentsPage from '../components/pages/AppointmentsPage';
import CalendarPage from '../components/pages/CalendarPage';
import CounselorsPage from '../components/pages/CounselorsPage';
import ProfilePage from '../components/pages/ProfilePage';
import SchoolsPage from '../components/pages/SchoolsPage';
import StudentsPage from '../components/pages/StudentsPage';
import UsersPage from '../components/pages/UsersPage';
import LogoutPage from '../components/pages/LogoutPage';
import NotFoundPage from '../components/pages/NotFoundPage';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/counselors" element={<CounselorsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/schools" element={<SchoolsPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
