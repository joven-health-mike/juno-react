// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import { AppointmentsContext } from "../../data/appointments"
import CreateAppointmentForm from "../forms/CreateAppointmentForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import AppointmentsTable from "../tables/AppointmentsTable"
import styles from "./pages.module.css"

const AppointmentsPage = () => {
  const role = "admin"

  const { appointments, setAppointments } = useContext(AppointmentsContext)

  const onFormSubmit = (appointment) => {
    setAppointments([...appointments, appointment])
  }

  const onAppointmentDeleteClicked = (appointmentTitle) => {
    if (window.confirm("Delete this appointment?")) {
      let newAppointments = appointments.filter(
        (appointment) => appointment.title !== appointmentTitle
      )
      setAppointments(newAppointments)
    }
  }

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Appointments</h1>
      <>
        <CreateAppointmentForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <AppointmentsTable
          appointments={appointments}
          onDeleteClicked={onAppointmentDeleteClicked}
        />
      </>
    </div>
  )
}

export default AppointmentsPage
