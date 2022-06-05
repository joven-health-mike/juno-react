// Copyright 2022 Social Fabric, LLC

import React from 'react';

export type School = {
  _id: number;
  name: string;
  email: string;
};

export const emptySchool = {
  _id: -1,
  name: '',
  email: '',
};

export const exampleSchools = [
  {
    _id: 0,
    name: 'Aardvark Academy',
    email: 'aardvark-academy@jovenhealth.com',
  },
];

type ISchoolsContext = {
  schools: School[];
  setSchools: any;
};

export const SchoolsContext = React.createContext<ISchoolsContext>({
  schools: exampleSchools,
  setSchools: () => {},
});
