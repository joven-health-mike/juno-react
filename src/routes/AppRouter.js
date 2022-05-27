/* eslint-disable no-unused-vars */
import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import AppointmentsPage from "../components/pages/AppointmentsPage"
import CalendarPage from "../components/pages/CalendarPage"
import CounselorsPage from "../components/pages/CounselorsPage"
import LoginPage from "../components/pages/LoginPage"
import LogoutPage from "../components/pages/LogoutPage"
import HomePage from "../components/pages/HomePage"
import SchoolsPage from "../components/pages/SchoolsPage"
import StudentsPage from "../components/pages/StudentsPage"
import UsersPage from "../components/pages/UsersPage"

const AppRouter = ({ isLoggedIn, role }) => {
  return (
    <Routes>
      {isLoggedIn && (
        <>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/appointments" exact element={<AppointmentsPage />} />
          <Route path="/calendar" exact element={<CalendarPage />} />
          <Route path="/counselors" exact element={<CounselorsPage />} />
          <Route path="/schools" exact element={<SchoolsPage />} />
          <Route path="/students" exact element={<StudentsPage />} />
          <Route path="/users" exact element={<UsersPage />} />
          <Route path="/logout" exact element={<LogoutPage />} />
          <Route path="/login" exact element={<LoginPage />} />
        </>
      )}
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route
        path="/appointments"
        exact
        element={<Navigate replace to="/login" />}
      />
      <Route
        path="/calendar"
        exact
        element={<Navigate replace to="/login" />}
      />
      <Route
        path="/counselors"
        exact
        element={<Navigate replace to="/login" />}
      />
      <Route path="/schools" exact element={<Navigate replace to="/login" />} />
      <Route
        path="/students"
        exact
        element={<Navigate replace to="/login" />}
      />
      <Route path="/users" exact element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default AppRouter
