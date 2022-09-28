// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { AppointmentsContext, exampleAppointments } from './data/appointments';
import { CounselorsContext, exampleCounselors } from './data/counselors';
import { SchoolsContext, SchoolsProvider } from './data/schools';
import { exampleStudents, StudentsContext } from './data/students';
import { UsersContext, UsersProvider } from './data/users';
import AppRouter from './routes/AppRouter';

Modal.setAppElement('#root');

function App() {
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
        <SchoolsProvider data={schools}>
          <StudentsContext.Provider value={studentsContextValue}>
            <UsersProvider data={users}>
              <AppRouter />
            </UsersProvider>
          </StudentsContext.Provider>
        </SchoolsProvider>
      </CounselorsContext.Provider>
    </AppointmentsContext.Provider>
  );
}

export default App;
