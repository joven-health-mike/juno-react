import axios from 'axios';

export const SERVER_BASE_URL =
  process.env.REACT_APP_SERVER_BASE_URL || 'https://localhost';
export const SERVER_API_VERSION = process.env.REACT_APP_SERVER_API_VERSION || 1;
export const SERVER_API_URL = SERVER_BASE_URL + '/api/' + SERVER_API_VERSION;

axios.defaults.withCredentials = true;

export const redirectTo = (window: Window, url: string) => {
  window.location.href = url;
};

export const HttpServer = axios.create({
  baseURL: SERVER_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  transformResponse: [unwrapData],
});

function unwrapData(data: any, _headers?: any) {
  return JSON.parse(data).data;
}
