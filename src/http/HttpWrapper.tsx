// Copyright 2022 Social Fabric, LLC

import axios from 'axios';

export async function httpGet(url: string) {
  const result = await axios.get(url);
  return result;
}

export async function httpPost(url: string, data: any) {
  const result = await axios.post(url, data);
  return result;
}

export async function httpPut(url: string, id: string, data: any) {
  const result = await axios.put(url + '/' + id, data);
  return result;
}

export async function httpDelete(url: string, id: string) {
  const result = await axios.delete(url + '/' + id);
  return result;
}
