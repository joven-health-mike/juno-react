// Copyright 2022 Social Fabric, LLC

import React, { useState } from 'react';
import Modal from 'react-modal';
import { Auth0Provider } from '@auth0/auth0-react';
import { AppointmentsContext, exampleAppointments } from './data/appointments';
import { CounselorsContext, exampleCounselors } from './data/counselors';
import { SchoolsContext, exampleSchools } from './data/schools';
import { exampleStudents, StudentsContext } from './data/students';
import { UsersContext, exampleUsers } from './data/users';
import AppRouter from './routes/AppRouter';

Modal.setAppElement('#root');

function App() {
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
    <Auth0Provider
      domain="dev-9e-ctbg8.us.auth0.com"
      clientId="gRTSrWR4kDPpH28Udftm6X3H35kmFUKD"
      redirectUri={'http://localhost:3000'}
    >
      <AppointmentsContext.Provider value={appointmentsContextValue}>
        <CounselorsContext.Provider value={counselorsContextValue}>
          <SchoolsContext.Provider value={schoolsContextValue}>
            <StudentsContext.Provider value={studentsContextValue}>
              <UsersContext.Provider value={usersContextValue}>
                <AppRouter />
              </UsersContext.Provider>
            </StudentsContext.Provider>
          </SchoolsContext.Provider>
        </CounselorsContext.Provider>
      </AppointmentsContext.Provider>
    </Auth0Provider>
  );
}

export default App;
