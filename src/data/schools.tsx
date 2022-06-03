// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { httpGet, httpPost, httpPut, httpDelete } from '../http/HttpWrapper';

export const exampleSchools = [
  {
    name: 'Aardvark Academy',
    email: 'aardvark-academy@jovenhealth.com',
    facilitators: ['Bruce Wayne', 'Dwayne Johnson', 'Antonio Banderez'],
  },
];

export type School = {
  name: string;
  email: string;
  facilitators: string[];
};

type ISchoolsContext = {
  schools: School[];
  setSchools: any;
};

export const SchoolsContext = React.createContext<ISchoolsContext>({
  schools: exampleSchools,
  setSchools: () => {},
});

const BASE_URL = 'http://localhost:8080/api/schools';
export const initialSchools = [];

export async function getAllSchools() {
  const result = await httpGet(BASE_URL);
  //convert http result to list of schools
  return result;
}

export async function addSchool(school: School) {
  const result = await httpPost(BASE_URL, school);
  //convert http result to school
  return result;
}

export async function updateSchool(id: string, school: School) {
  const result = await httpPut(BASE_URL, id, school);
  // convert http result to school
  return result;
}

export async function deleteSchool(id: string) {
  const result = await httpDelete(BASE_URL, id);
  // convert http result to school
  return result;
}
