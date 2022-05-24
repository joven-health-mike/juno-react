// Copyright 2022 Social Fabric, LLC

import React from "react"

const AppointmentDetails = ({ appointment }) => {
  return (
    <>
      <label>
        Title:
        <h1>{appointment.title}</h1>
      </label>
      <label>
        Start Time:
        <p>{appointment.start}</p>
      </label>
      <label>
        End Time:
        <p>{appointment.end}</p>
      </label>
      <label>
        Counselor:
        <p>{appointment.counselor}</p>
      </label>
      <label>
        Student:
        <p>{appointment.student}</p>
      </label>
      <label>
        Facilitator:
        <p>{appointment.facilitator}</p>
      </label>
    </>
  )
}

export default AppointmentDetails
