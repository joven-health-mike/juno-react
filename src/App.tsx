// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { AppointmentsContext, exampleAppointments } from './data/appointments';
import { CounselorsContext, exampleCounselors } from './data/counselors';
import { SchoolsContext, exampleSchools } from './data/schools';
import { exampleStudents, StudentsContext } from './data/students';
import { UsersContext, UsersProvider } from './data/users';
import AppRouter from './routes/AppRouter';

Modal.setAppElement('#root');

function App() {
  const [appointments, setAppointments] = useState(exampleAppointments);
  const [counselors, setCounselors] = useState(exampleCounselors);
  const [schools, setSchools] = useState(exampleSchools);
  const [students, setStudents] = useState(exampleStudents);
  const { data: users } = useContext(UsersContext);
  const appointmentsContextValue = { appointments, setAppointments };
  const counselorsContextValue = { counselors, setCounselors };
  const schoolsContextValue = { schools, setSchools };
  const studentsContextValue = { students, setStudents };

  return (
    <AppointmentsContext.Provider value={appointmentsContextValue}>
      <CounselorsContext.Provider value={counselorsContextValue}>
        <SchoolsContext.Provider value={schoolsContextValue}>
          <StudentsContext.Provider value={studentsContextValue}>
            <UsersProvider value={users}>
              <AppRouter />
            </UsersProvider>
          </StudentsContext.Provider>
        </SchoolsContext.Provider>
      </CounselorsContext.Provider>
    </AppointmentsContext.Provider>
  );
}

export default App;
