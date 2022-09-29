// Copyright 2022 Social Fabric, LLC

import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { AppointmentsContext, AppointmentsProvider } from './data/appointments';
import {
  Counselor,
  CounselorsContext,
  exampleCounselors,
} from './data/counselors';
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

  const { data: users } = useContext(UsersContext);
  const { data: appointments } = useContext(AppointmentsContext);
  const { data: schools } = useContext(SchoolsContext);

  // don't have api for yet.
  const [students, setStudents] = useState(exampleStudents);
  const studentsContextValue = { students, setStudents };
  const [counselors, setCounselors] = useState<Counselor[]>(exampleCounselors);
  const counselorsContextValue = { counselors, setCounselors };

  return (
    <LoggedInUserContext.Provider value={loggedInUserContextValue}>
      <CounselorsContext.Provider value={counselorsContextValue}>
        <StudentsContext.Provider value={studentsContextValue}>
          <SchoolsProvider data={schools}>
            <AppointmentsProvider data={appointments}>
              <UsersProvider data={users}>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <AppRouter isAuthenticated={isAuthenticated} />}
              </UsersProvider>
            </AppointmentsProvider>
          </SchoolsProvider>
        </StudentsContext.Provider>
      </CounselorsContext.Provider>
    </LoggedInUserContext.Provider>
  );
}

export default App;
