// Copyright 2022 Social Fabric, LLC

import React from "react"
import AppointmentDetails from "../details/AppointmentDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const AppointmentDetailPage = ({ appointment }) => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Appointment Details</h1>
      <AppointmentDetails appointment={appointment} />
    </div>
  )
}

export default AppointmentDetailPage
