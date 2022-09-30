// Copyright 2022 Social Fabric, LLC

import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { AppointmentsContext, AppointmentsProvider } from './data/appointments';
import { CounselorsContext, CounselorsProvider } from './data/counselors';
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
import { LoggedInUserService } from './services/loggedInUser.service';

Modal.setAppElement('#root');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User>(emptyUser);
  const loggedInUserContextValue = { loggedInUser, setLoggedInUser };
  const [isLoading, setIsLoading] = useState(true);

  const { data: users } = useContext(UsersContext);
  const { data: counselors } = useContext(CounselorsContext);
  const { data: appointments } = useContext(AppointmentsContext);
  const { data: schools } = useContext(SchoolsContext);

  // don't have api for this yet.
  const [students, setStudents] = useState(exampleStudents);
  const studentsContextValue = { students, setStudents };

  useEffect(() => {
    function main() {
      setIsLoading(true);
      checkAuthentication();
    }
    main();
  }, []);

  async function checkAuthentication() {
    try {
      const service = new LoggedInUserService();
      const { data: user, status } = await service.getAll();
      setIsAuthenticated(status === 200);
      setLoggedInUser(user);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LoggedInUserContext.Provider value={loggedInUserContextValue}>
      <StudentsContext.Provider value={studentsContextValue}>
        <AppointmentsProvider data={appointments}>
          <SchoolsProvider data={schools}>
            <CounselorsProvider data={counselors}>
              <UsersProvider data={users}>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <AppRouter isAuthenticated={isAuthenticated} />}
              </UsersProvider>
            </CounselorsProvider>
          </SchoolsProvider>
        </AppointmentsProvider>
      </StudentsContext.Provider>
    </LoggedInUserContext.Provider>
  );
}

export default App;
