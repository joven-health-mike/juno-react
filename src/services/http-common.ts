import axios from 'axios';

// TODO: architect configuration for environment
const localDevHost = 'https://localhost/api/';
const apiVersion = '1';

axios.defaults.withCredentials = true;

export const HttpServer = axios.create({
  baseURL: localDevHost + apiVersion,
  headers: {
    'Content-type': 'application/json',
  },
  transformResponse: [unwrapData],
});

function unwrapData(data: any, _headers?: any) {
  return JSON.parse(data).data;
}
