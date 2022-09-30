// Copyright 2022 Social Fabric, LLC

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
import { LoggedInUserService } from './services/loggedInUser.service';

Modal.setAppElement('#root');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User>(emptyUser);
  const loggedInUserContextValue = { loggedInUser, setLoggedInUser };
  const [isLoading, setIsLoading] = useState(true);

  const { data: users } = useContext(UsersContext);
  const { data: appointments } = useContext(AppointmentsContext);
  const { data: schools } = useContext(SchoolsContext);

  // don't have api for this yet.
  const [students, setStudents] = useState(exampleStudents);
  const studentsContextValue = { students, setStudents };
  const [counselors, setCounselors] = useState<Counselor[]>(exampleCounselors);
  const counselorsContextValue = { counselors, setCounselors };

  useEffect(() => {
    main();
  }, []);

  function main() {
    setIsLoading(true);
    checkAuthentication();
  }

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
