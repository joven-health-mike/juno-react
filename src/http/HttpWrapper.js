// Copyright 2022 Social Fabric, LLC

import axios from "axios"

export async function httpGet(url) {
  const result = await axios.get(url)
  return result
}

export async function httpPost(url, data) {
  const result = await axios.post(url, data)
  return result
}

export async function httpPut(url, id, data) {
  const result = await axios.put(url + "/" + id, data)
  return result
}

export async function httpDelete(url, id) {
  const result = await axios.delete(url + "/" + id)
  return result
}
