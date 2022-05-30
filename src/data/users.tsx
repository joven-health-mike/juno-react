// Copyright 2022 Social Fabric, LLC

import React from "react"
import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const exampleUsers = [
  {
    name: "Mike Burke",
    email: "mike@jovenhealth.com",
    password: "abcd",
    role: "admin",
    associatedAccount: "admin",
  },
  {
    name: "Jacek McGuinness",
    email: "jacek-mcguinness@jovenhealth.com",
    password: "abcd",
    role: "counselor",
    associatedAccount: "Jacek McGuinness",
  },
]

interface User {
  name: string
  email: string
  password: string
  role: string
  associatedAccount: string
}

interface IUsersContext {
  users: User[]
  setUsers: any
}

export const UsersContext = React.createContext<IUsersContext>({
  users: exampleUsers,
  setUsers: () => {},
})

export const ROLES = [
  "admin",
  "counselor",
  "facilitator",
  "school",
  "student",
  "guardian",
]

const BASE_URL = "http://localhost:8080/api/users"
export const initialUsers = []

export async function getAllUsers() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of users
  return result
}

export async function addUser(user: User) {
  const result = await httpPost(BASE_URL, user)
  //convert http result to user
  return result
}

export async function updateUser(id: string, user: User) {
  const result = await httpPut(BASE_URL, id, user)
  // convert http result to user
  return result
}

export async function deleteUser(id: string) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to user
  return result
}
