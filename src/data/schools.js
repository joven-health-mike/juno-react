// Copyright 2022 Social Fabric, LLC

import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const schoolSchema = {
  name: "string",
  email: "string",
  facilitators: "string[]",
}

const BASE_URL = "http://localhost:8080/api/schools"
export const initialSchools = []

export async function getAllSchools() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of schools
  return result
}

export async function addSchool(school) {
  const result = await httpPost(BASE_URL, school)
  //convert http result to school
  return result
}

export async function updateSchool(id, school) {
  const result = await httpPut(BASE_URL, id, school)
  // convert http result to school
  return result
}

export async function deleteSchool(id) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to school
  return result
}
