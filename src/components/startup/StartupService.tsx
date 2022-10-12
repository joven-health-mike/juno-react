// Copyright 2022 Social Fabric, LLC

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  AppointmentsContext,
  AppointmentsProvider,
} from '../../data/appointments';
import { CounselorsContext, CounselorsProvider } from '../../data/counselors';
import { SchoolsContext, SchoolsProvider } from '../../data/schools';
import { StudentsContext, StudentsProvider } from '../../data/students';
import {
  emptyUser,
  LoggedInUserContext,
  User,
  UsersContext,
  UsersProvider,
} from '../../data/users';
import { LoggedInUserService } from '../../services/loggedInUser.service';

type StartupServiceProps = {
  onComplete: (isAuthenticated: boolean, loggedInUser: User) => void;
  onError: (error: unknown) => void;
  children?: ReactNode | undefined;
};

const StartupService: React.FC<StartupServiceProps> = ({
  onComplete,
  onError,
  children,
}) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(emptyUser);
  const loggedInUserContextValue = { loggedInUser, setLoggedInUser };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: appointments, getAll: getAppointments } =
    useContext(AppointmentsContext);
  const { data: counselors, getAll: getCounselors } =
    useContext(CounselorsContext);
  const { data: schools, getAll: getSchools } = useContext(SchoolsContext);
  const { data: students, getAll: getStudents } = useContext(StudentsContext);
  const { data: users, getAll: getUsers } = useContext(UsersContext);

  useEffect(() => {
    // initial (async) load of application data
    getAppointments();
    getCounselors();
    getSchools();
    getStudents();
    getUsers();
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAuthentication() {
    try {
      const service = new LoggedInUserService();
      const { data: user, status } = await service.getAll();
      // server returns 200 if logged in and 204 if not
      setIsAuthenticated(status === 200);
      setLoggedInUser(user);
      onComplete(isAuthenticated, user);
    } catch (err) {
      onError(err);
    }
  }

  return (
    <>
      <LoggedInUserContext.Provider value={loggedInUserContextValue}>
        <StudentsProvider data={students}>
          <AppointmentsProvider data={appointments}>
            <SchoolsProvider data={schools}>
              <CounselorsProvider data={counselors}>
                <UsersProvider data={users}>{children}</UsersProvider>
              </CounselorsProvider>
            </SchoolsProvider>
          </AppointmentsProvider>
        </StudentsProvider>
      </LoggedInUserContext.Provider>
    </>
  );
};

export default StartupService;
