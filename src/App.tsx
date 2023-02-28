// Copyright 2022 Social Fabric, LLC

import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { AppointmentsContext, AppointmentsProvider } from './data/appointments';
import { SchoolsContext, SchoolsProvider } from './data/schools';
import { StudentsContext, StudentsProvider } from './data/students';
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
  const { data: students } = useContext(StudentsContext);

  useEffect(() => {
    function main() {
      setIsLoading(true);
      checkAuthentication();
    }
    main();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAuthentication() {
    try {
      const service = new LoggedInUserService();
      const { data: user, status } = await service.getAll();
      // server returns 200 if logged in and 204 if not
      setIsAuthenticated(status === 200);
      setLoggedInUser(user);
    } catch (err) {
      // TODO: What happens if the server is down or throws an error?
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LoggedInUserContext.Provider value={loggedInUserContextValue}>
      <StudentsProvider data={students}>
        <AppointmentsProvider data={appointments}>
          <SchoolsProvider data={schools}>
            <UsersProvider data={users}>
              {isLoading && <div>Loading...</div>}
              {!isLoading && <AppRouter isAuthenticated={isAuthenticated} />}
            </UsersProvider>
          </SchoolsProvider>
        </AppointmentsProvider>
      </StudentsProvider>
    </LoggedInUserContext.Provider>
  );
}

export default App;
