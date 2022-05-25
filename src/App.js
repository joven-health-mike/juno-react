/* eslint-disable no-unused-vars */
// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import CreateAppointmentForm from "./components/forms/CreateAppointmentForm"
import { AppointmentsContext, exampleAppointments } from "./data/appointments"
import { CounselorsContext, exampleCounselors } from "./data/counselors"
import { SchoolsContext, exampleSchools } from "./data/schools"
import { exampleStudents, StudentsContext } from "./data/students"
import { UsersContext } from "./data/users"

function App() {
  const [appointments, setAppointments] = useState(exampleAppointments)
  const [counselors, setCounselors] = useState(exampleCounselors)
  const [schools, setSchools] = useState(exampleSchools)
  const [students, setStudents] = useState(exampleStudents)
  const [users, setUsers] = useState([])

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
                <CreateAppointmentForm
                  defaultAppointment={exampleAppointments[0]}
                  onSubmit={onAppointmentSubmit}
                  onCancel={onAppointmentCancel}
                />
              </UsersContext.Provider>
            </StudentsContext.Provider>
          </SchoolsContext.Provider>
        </CounselorsContext.Provider>
      </AppointmentsContext.Provider>
    </>
  )
}

export default App
