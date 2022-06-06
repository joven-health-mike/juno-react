// Copyright 2022 Social Fabric, LLC

import React from 'react';

export type User = {
  _id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

export const emptyUser = {
  _id: -1,
  name: '',
  email: '',
  password: '',
  role: '',
};

export const exampleUsers = [
  {
    _id: 0,
    name: 'Mike Burke',
    email: 'mike@jovenhealth.com',
    password: 'abcd',
    role: 'admin',
  },
  {
    _id: 1,
    name: 'Jacek McGuinness',
    email: 'jacek-mcguinness@jovenhealth.com',
    password: 'abcd',
    role: 'counselor',
  },
];

export type IUsersContext = {
  users: User[];
  setUsers: (users: User[]) => void;
};

export const UsersContext = React.createContext<IUsersContext>({
  users: exampleUsers,
  setUsers: () => {},
});

export const ROLES = [
  'admin',
  'counselor',
  'facilitator',
  'school',
  'student',
  'guardian',
];
