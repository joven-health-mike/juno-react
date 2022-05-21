// Copyright 2022 Social Fabric, LLC

import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const studentSchema = {
  first_name: "string",
  last_name: "string",
  school: "string",
  counselor: "string",
}

const BASE_URL = "http://localhost:8080/api/students"
export const initialStudents = []

export async function getAllStudents() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of students
  return result
}

export async function addStudent(student) {
  const result = await httpPost(BASE_URL, student)
  //convert http result to student
  return result
}

export async function updateStudent(id, student) {
  const result = await httpPut(BASE_URL, id, student)
  // convert http result to student
  return result
}

export async function deleteStudent(id) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to student
  return result
}
