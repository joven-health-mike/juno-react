// Copyright 2022 Social Fabric, LLC

import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const appointmentSchema = {
  title: "string",
  start: "string",
  end: "string",
  counselor: "id",
  student: "id",
  facilitator: "id",
}

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
