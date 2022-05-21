// Copyright 2022 Social Fabric, LLC

import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const userSchema = {
  name: "string",
  email: "string",
  password: "string",
  role: "string",
  associatedSchools: "string",
  associatedCounselors: "string",
  associatedStudents: "string",
}

const BASE_URL = "http://localhost:8080/api/users"
export const initialUsers = []

export async function getAllUsers() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of users
  return result
}

export async function addUser(user) {
  const result = await httpPost(BASE_URL, user)
  //convert http result to user
  return result
}

export async function updateUser(id, user) {
  const result = await httpPut(BASE_URL, id, user)
  // convert http result to user
  return result
}

export async function deleteUser(id) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to user
  return result
}
