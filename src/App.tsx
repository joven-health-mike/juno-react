// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import { AppointmentsContext, exampleAppointments } from "./data/appointments"
import { CounselorsContext, exampleCounselors } from "./data/counselors"
import { SchoolsContext, exampleSchools } from "./data/schools"
import { exampleStudents, StudentsContext } from "./data/students"
import { UsersContext, exampleUsers } from "./data/users"
import AppRouter from "./routes/AppRouter"

function App() {
  const [appointments, setAppointments] = useState(exampleAppointments)
  const [counselors, setCounselors] = useState(exampleCounselors)
  const [schools, setSchools] = useState(exampleSchools)
  const [students, setStudents] = useState(exampleStudents)
  const [users, setUsers] = useState(exampleUsers)
  const appointmentsContextValue = { appointments, setAppointments }
  const counselorsContextValue = { counselors, setCounselors }
  const schoolsContextValue = { schools, setSchools }
  const studentsContextValue = { students, setStudents }
  const usersContextValue = { users, setUsers }

  return (
    <AppointmentsContext.Provider value={appointmentsContextValue}>
      <CounselorsContext.Provider value={counselorsContextValue}>
        <SchoolsContext.Provider value={schoolsContextValue}>
          <StudentsContext.Provider value={studentsContextValue}>
            <UsersContext.Provider value={usersContextValue}>
              <AppRouter
                isLoggedIn={true}
                role={"admin"}
                loggedInUser={users[0]}
              />
            </UsersContext.Provider>
          </StudentsContext.Provider>
        </SchoolsContext.Provider>
      </CounselorsContext.Provider>
    </AppointmentsContext.Provider>
  )
}

export default App
