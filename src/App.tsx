// Copyright 2022 Social Fabric, LLC

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AppointmentsContext, exampleAppointments } from './data/appointments';
import { CounselorsContext, exampleCounselors } from './data/counselors';
import { SchoolsContext, exampleSchools } from './data/schools';
import { exampleStudents, StudentsContext } from './data/students';
import {
  UsersContext,
  exampleUsers,
  LoggedInUserContext,
  emptyUser,
} from './data/users';
import AppRouter from './routes/AppRouter';

Modal.setAppElement('#root');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(emptyUser);
  const loggedInUserContextValue = { loggedInUser, setLoggedInUser };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get(
          'https://localhost/api/1/loggedInUser'
        );
        console.log(response.status);
        if (response.status === 200) {
          // logged in
          setIsAuthenticated(true);
          setLoggedInUser(response.data);
        } else if (response.status === 204) {
          // not logged in - redirect to login page
          setIsAuthenticated(false);
        } else {
          // something unexpected happened...
        }
        // setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    checkAuthentication();
  }, []);

  const [appointments, setAppointments] = useState(exampleAppointments);
  const [counselors, setCounselors] = useState(exampleCounselors);
  const [schools, setSchools] = useState(exampleSchools);
  const [students, setStudents] = useState(exampleStudents);
  const [users, setUsers] = useState(exampleUsers);
  const appointmentsContextValue = { appointments, setAppointments };
  const counselorsContextValue = { counselors, setCounselors };
  const schoolsContextValue = { schools, setSchools };
  const studentsContextValue = { students, setStudents };
  const usersContextValue = { users, setUsers };

  return (
    <AppointmentsContext.Provider value={appointmentsContextValue}>
      <CounselorsContext.Provider value={counselorsContextValue}>
        <LoggedInUserContext.Provider value={loggedInUserContextValue}>
          <SchoolsContext.Provider value={schoolsContextValue}>
            <StudentsContext.Provider value={studentsContextValue}>
              <UsersContext.Provider value={usersContextValue}>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <AppRouter isAuthenticated={isAuthenticated} />}
              </UsersContext.Provider>
            </StudentsContext.Provider>
          </SchoolsContext.Provider>
        </LoggedInUserContext.Provider>
      </CounselorsContext.Provider>
    </AppointmentsContext.Provider>
  );
}

export default App;
