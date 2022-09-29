// Copyright 2022 Social Fabric, LLC

import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { AppointmentsContext, exampleAppointments } from './data/appointments';
import { CounselorsContext, exampleCounselors } from './data/counselors';
import { SchoolsContext, SchoolsProvider } from './data/schools';
import { exampleStudents, StudentsContext } from './data/students';
import {
  UsersContext,
  LoggedInUserContext,
  UsersProvider,
  emptyUser,
  User,
} from './data/users';
import AppRouter from './routes/AppRouter';

Modal.setAppElement('#root');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User>(emptyUser);
  const loggedInUserContextValue = { loggedInUser, setLoggedInUser };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      console.log('Checking authentication...');
      try {
        axios.defaults.withCredentials = true;
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
          setLoggedInUser(emptyUser);
        } else {
          // something unexpected happened...
          console.log('Unexpected response: ' + response.status);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    checkAuthentication();
  }, []);

  const [appointments, setAppointments] = useState(exampleAppointments);
  const [counselors, setCounselors] = useState(exampleCounselors);
  const { data: schools } = useContext(SchoolsContext);
  const [students, setStudents] = useState(exampleStudents);
  const { data: users } = useContext(UsersContext);
  const appointmentsContextValue = { appointments, setAppointments };
  const counselorsContextValue = { counselors, setCounselors };
  const studentsContextValue = { students, setStudents };

  return (
    <AppointmentsContext.Provider value={appointmentsContextValue}>
      <CounselorsContext.Provider value={counselorsContextValue}>
        <LoggedInUserContext.Provider value={loggedInUserContextValue}>
          <SchoolsProvider data={schools}>
            <StudentsContext.Provider value={studentsContextValue}>
              <UsersProvider data={users}>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <AppRouter isAuthenticated={isAuthenticated} />}
              </UsersProvider>
            </StudentsContext.Provider>
          </SchoolsProvider>
        </LoggedInUserContext.Provider>
      </CounselorsContext.Provider>
    </AppointmentsContext.Provider>
  );
}

export default App;
