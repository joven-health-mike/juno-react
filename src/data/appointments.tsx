// Copyright 2022 Social Fabric, LLC

import React from "react"
import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const exampleAppointments = [
  {
    title: "Johnny R",
    start: new Date(),
    end: new Date(),
    counselor: "Jacek McGuinness",
    student: "Johnny Rickets",
    facilitator: "Bruce Wayne",
  },
  {
    title: "Jennifer F",
    start: new Date(),
    end: new Date(),
    counselor: "Jacek McGuinness",
    student: "Jennifer Frigo",
    facilitator: "Dwayne Johnson",
  },
  {
    title: "Chris M",
    start: new Date(),
    end: new Date(),
    counselor: "Jacek McGuinness",
    student: "Chris Moon",
    facilitator: "Antonio Banderez",
  },
]

export type Appointment = {
  title: string
  start: Date
  end: Date
  counselor: string
  student: string
  facilitator: string
}

interface IAppointmentsContext {
  appointments: Appointment[]
  setAppointments: any
}

export const AppointmentsContext = React.createContext<IAppointmentsContext>({
  appointments: exampleAppointments,
  setAppointments: () => {},
})

const BASE_URL = "http://localhost:8080/api/appointments"
export const initialAppointments = []

export async function getAllAppointments() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of appointments
  return result
}

export async function addAppointment(appointment: Appointment) {
  const result = await httpPost(BASE_URL, appointment)
  //convert http result to appointment
  return result
}

export async function updateAppointment(id: String, appointment: Appointment) {
  const result = await httpPut(BASE_URL, id, appointment)
  // convert http result to appointment
  return result
}

export async function deleteAppointment(id: String) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to appointment
  return result
}
