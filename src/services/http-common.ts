import axios from 'axios';

// TODO: architect configuration for environment
const localDevHost = 'http://localhost:8080/api/';
const apiVersion = '1';

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
