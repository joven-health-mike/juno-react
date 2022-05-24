// Copyright 2022 Social Fabric, LLC

import React from "react"
import AppointmentDetails from "./components/details/AppointmentDetails"

function App() {
  const appointment = {
    title: "My Appointment",
    start: "8:00 am",
    end: "8:30 am",
    counselor: "Jacek McGuinness",
    student: "Kaylee Macentire",
    facilitator: "",
  }

  return (
    <>
      <AppointmentDetails appointment={appointment} />
    </>
  )
}

export default App
