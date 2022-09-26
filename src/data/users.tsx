// Copyright 2022 Social Fabric, LLC

import React, { Dispatch, FC, ProviderProps, useState } from 'react';
import { SetStateAction } from 'react';
import { Service } from '../services/service';
import { UserService } from '../services/user.service';

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

export type UserContextData = {
  users: User[];
  getUsers: () => void;
  addUser: (user: User) => void;
};

export const UsersContext = React.createContext<UserContextData>({
  users: [],
  getUsers: () => null,
  addUser: (user: User) => null,
});

export const UsersProvider: FC<ProviderProps<User[]>> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const service = new UserService();
  const getUsers = async () => {
    try {
      const users = await service.getAll();
      setUsers(users.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async (user: User) => {
    try {
      await service.create(user);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO: the rest of relevant crud
  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
        addUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export type Role =
  | 'admin'
  | 'counselor'
  | 'facilitator'
  | 'school'
  | 'student'
  | 'guardian';

export const ROLES = [
  'admin',
  'counselor',
  'facilitator',
  'school',
  'student',
  'guardian',
];
