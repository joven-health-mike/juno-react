// Copyright 2022 Social Fabric, LLC

import React from "react"
import AppointmentDetails from "../details/AppointmentDetails"

const AppointmentDetailPage = ({ appointment }) => {
  return (
    <>
      <h1>Appointment Details</h1>
      <AppointmentDetails appointment={appointment} />
    </>
  )
}

export default AppointmentDetailPage
