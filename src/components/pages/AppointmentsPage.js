// Copyright 2022 Social Fabric, LLC

import React from "react"
import { AppointmentsContext } from "../../data/appointments"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import AppointmentsTable from "../tables/AppointmentsTable"
import styles from "./pages.module.css"

const AppointmentsPage = () => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Appointments</h1>
      <AppointmentsContext.Consumer>
        {(appointments) => {
          return <AppointmentsTable appointments={appointments} />
        }}
      </AppointmentsContext.Consumer>
    </div>
  )
}

export default AppointmentsPage
