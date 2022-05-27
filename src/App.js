/* eslint-disable no-unused-vars */
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

  return (
    <>
      <AppointmentsContext.Provider value={appointments}>
        <CounselorsContext.Provider value={counselors}>
          <SchoolsContext.Provider value={schools}>
            <StudentsContext.Provider value={students}>
              <UsersContext.Provider value={users}>
                <AppRouter isLoggedIn={true} role={"admin"} />
              </UsersContext.Provider>
            </StudentsContext.Provider>
          </SchoolsContext.Provider>
        </CounselorsContext.Provider>
      </AppointmentsContext.Provider>
    </>
  )
}

export default App
