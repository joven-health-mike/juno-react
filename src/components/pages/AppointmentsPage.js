// Copyright 2022 Social Fabric, LLC

import React from "react"
import { AppointmentsContext } from "../../data/appointments"
import CreateAppointmentForm from "../forms/CreateAppointmentForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import AppointmentsTable from "../tables/AppointmentsTable"
import styles from "./pages.module.css"

const AppointmentsPage = () => {
  const role = "admin"

  const onFormSubmit = (appointment) => {
    console.log("addAppointment:", appointment)
    // figure out how to add the appointment to the global context object
  }

  const onFormCancel = () => {}

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Appointments</h1>
      <AppointmentsContext.Consumer>
        {(appointments) => {
          return (
            <>
              <CreateAppointmentForm
                onSubmit={onFormSubmit}
                onCancel={onFormCancel}
              />
              <AppointmentsTable appointments={appointments} />
            </>
          )
        }}
      </AppointmentsContext.Consumer>
    </div>
  )
}

export default AppointmentsPage
