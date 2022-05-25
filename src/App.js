// Copyright 2022 Social Fabric, LLC

import React from "react"
import CreateAppointmentForm from "./components/forms/CreateAppointmentForm"

function App() {
  // This is just test code for now. Feel free to delete/modify it to test your components.
  const appointment = {
    title: "My Appointment",
    counselor: "Jacek McGuinness",
    student: "Kaidee Fowler",
    facilitator: "Antonio Hernandez",
  }
  appointment.start = new Date()
  appointment.end = new Date()

  const onAppointmentSubmit = () => {}

  const onAppointmentCancel = () => {}

  return (
    <>
      <CreateAppointmentForm
        defaultAppointment={appointment}
        onSubmit={onAppointmentSubmit}
        onCancel={onAppointmentCancel}
      />
    </>
  )
}

export default App
