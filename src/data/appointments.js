// Copyright 2022 Social Fabric, LLC

import React from "react"
import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const AppointmentsContext = React.createContext([])

export const appointmentSchema = {
  title: "string",
  start: "string",
  end: "string",
  counselor: "id",
  student: "id",
  facilitator: "id",
}

export const exampleAppointments = [
  {
    title: "Johnny R",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    counselor: "Jacek McGuinness",
    student: "Johnny Rickets",
    facilitator: "Aardvark Academy",
  },
  {
    title: "Jennifer F",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    counselor: "Jacek McGuinness",
    student: "Jennifer Frigo",
    facilitator: "Aardvark Academy",
  },
  {
    title: "Chris M",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    counselor: "Jacek McGuinness",
    student: "Chris Moon",
    facilitator: "Aardvark Academy",
  },
]

const BASE_URL = "http://localhost:8080/api/appointments"
export const initialAppointments = []

export async function getAllAppointments() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of appointments
  return result
}

export async function addAppointment(appointment) {
  const result = await httpPost(BASE_URL, appointment)
  //convert http result to appointment
  return result
}

export async function updateAppointment(id, appointment) {
  const result = await httpPut(BASE_URL, id, appointment)
  // convert http result to appointment
  return result
}

export async function deleteAppointment(id) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to appointment
  return result
}
