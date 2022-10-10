// Copyright 2022 Social Fabric, LLC

import React from 'react';

export type Student = {
  _id: string;
  first_name: string;
  last_name: string;
  schoolId: string;
  counselorId: string;
};

export const emptyStudent = {
  _id: '-1',
  first_name: '',
  last_name: '',
  schoolId: '-1',
  counselorId: '-1',
};

export const exampleStudents = [
  {
    _id: '24d59901-6dd8-4865-b871-292863e83d6f',
    first_name: 'Krista',
    last_name: 'Firmin',
    schoolId: '6265a973-0f32-421e-b378-9d7caefb1e6a',
    counselorId: 'cb5239fe-6d3a-41b7-b192-b0d6fa5e6aa3',
  },
  {
    _id: '722f30bf-c589-4e09-9b61-4c3c9e08b957',
    first_name: 'Bolat',
    last_name: 'Fairbairn',
    schoolId: 'a7e56e1c-f1c2-4bf9-a3fd-9fdef3fb87df',
    counselorId: 'd6d029d7-34e2-44ad-8fee-fc3e91c374ed',
  },
  {
    _id: '135a7e88-4fbf-49d2-b332-66dde1965a7f',
    first_name: 'Nemanja',
    last_name: 'Disney',
    schoolId: 'af96c257-8ee5-4902-b4cc-ddb086f81570',
    counselorId: '8e21b012-0662-48f7-8777-f9baa59d8ba3',
  },
];

export type IStudentsContext = {
  students: Student[];
  setStudents: (students: Student[]) => void;
};

export const StudentsContext = React.createContext<IStudentsContext>({
  students: exampleStudents,
  setStudents: () => {},
});
