// Copyright 2022 Social Fabric, LLC

import React from "react"
import { httpGet, httpPost, httpPut, httpDelete } from "../http/HttpWrapper"

export const CounselorsContext = React.createContext([])

export const counselorSchema = {
  name: "string",
  email: "string",
  roomLink: "string",
  assignedSchools: "string[]",
}

const BASE_URL = "http://localhost:8080/api/counselors"
export const initialCounselors = []

export async function getAllCounselors() {
  const result = await httpGet(BASE_URL)
  //convert http result to list of counselors
  return result
}

export async function addCounselor(counselor) {
  const result = await httpPost(BASE_URL, counselor)
  //convert http result to counselor
  return result
}

export async function updateCounselor(id, counselor) {
  const result = await httpPut(BASE_URL, id, counselor)
  // convert http result to counselor
  return result
}

export async function deleteCounselor(id) {
  const result = await httpDelete(BASE_URL, id)
  // convert http result to counselor
  return result
}
