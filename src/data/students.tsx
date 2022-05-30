// Copyright 2022 Social Fabric, LLC

import React from "react"
import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const exampleStudents = [
  {
    first_name: "Johnny",
    last_name: "Rickets",
    school: "Aardvark Academy",
    counselor: "Jacek McGuinness",
  },
  {
    first_name: "Jennifer",
    last_name: "Frigo",
    school: "Aardvark Academy",
    counselor: "Jacek McGuinness",
  },
  {
    first_name: "Chris",
    last_name: "Moon",
    school: "Aardvark Academy",
    counselor: "Jacek McGuinness",
  },
]

interface Student {
  first_name: string
  last_name: string
  school: string
  counselor: string
}

interface IStudentsContext {
  students: Student[]
  setStudents: any
}

export const StudentsContext = React.createContext<IStudentsContext>({
  students: exampleStudents,
  setStudents: () => {},
})

const BASE_URL = "http://localhost:8080/api/students"
export const initialStudents = []

export async function getAllStudents() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of students
  return result
}

export async function addStudent(student: Student) {
  const result = await httpPost(BASE_URL, student)
  //convert http result to student
  return result
}

export async function updateStudent(id: string, student: Student) {
  const result = await httpPut(BASE_URL, id, student)
  // convert http result to student
  return result
}

export async function deleteStudent(id: string) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to student
  return result
}
