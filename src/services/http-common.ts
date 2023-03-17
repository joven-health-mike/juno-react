import axios from 'axios';

export const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
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

export function isValidURL(url: string) {
  // regular expression to match URLs
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  return urlRegex.test(url);
}

export function isValidEmail(email: string) {
  // regular expression to match email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

  return emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string) {
  // regular expression to match US phone number
  const phoneRegex = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

  return phoneRegex.test(phoneNumber);
}
