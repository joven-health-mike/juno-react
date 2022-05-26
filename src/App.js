/* eslint-disable no-unused-vars */
// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import { AppointmentsContext, exampleAppointments } from "./data/appointments"
import { CounselorsContext, exampleCounselors } from "./data/counselors"
import { SchoolsContext, exampleSchools } from "./data/schools"
import { exampleStudents, StudentsContext } from "./data/students"
import { UsersContext, exampleUsers } from "./data/users"
import UserDetails from "./components/details/UserDetails"

function App() {
  const [appointments, setAppointments] = useState(exampleAppointments)
  const [counselors, setCounselors] = useState(exampleCounselors)
  const [schools, setSchools] = useState(exampleSchools)
  const [students, setStudents] = useState(exampleStudents)
  const [users, setUsers] = useState(exampleUsers)

  // This is just test code for now. Feel free to delete/modify it to test your components.

  const onAppointmentSubmit = (appointment) => {
    console.log("Appointment Submitted:", appointment)
    // add appointment
    // update appointments
  }

  const onAppointmentCancel = () => {
    console.log("Cancel")
  }

  return (
    <>
      <AppointmentsContext.Provider value={appointments}>
        <CounselorsContext.Provider value={counselors}>
          <SchoolsContext.Provider value={schools}>
            <StudentsContext.Provider value={students}>
              <UsersContext.Provider value={users}>
                <UserDetails user={users[0]} />
              </UsersContext.Provider>
            </StudentsContext.Provider>
          </SchoolsContext.Provider>
        </CounselorsContext.Provider>
      </AppointmentsContext.Provider>
    </>
  )
}

export default App
