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
  schoolId: '',
  counselorId: '-1',
};

export const exampleStudents = [
  {
    _id: '0',
    first_name: 'Johnny',
    last_name: 'Rickets',
    schoolId: '0',
    counselorId: '0',
  },
  {
    _id: '1',
    first_name: 'Jennifer',
    last_name: 'Frigo',
    schoolId: '0',
    counselorId: '0',
  },
  {
    _id: '2',
    first_name: 'Chris',
    last_name: 'Moon',
    schoolId: '0',
    counselorId: '0',
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
