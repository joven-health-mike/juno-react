// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { UserService } from '../services/user.service';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';

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

export const UsersContext = React.createContext<ContextData<User>>({
  data: [],
  getAll: () => null,
  get: (id: string) => null,
  add: (user: User) => null,
  update: (user: User) => null,
  delete: (user: User) => null,
});

export const UsersProvider: FC<DataProviderProps<User[]>> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const service = new UserService();

  const delegate: ContextData<User> = {
    data: users,
    getAll: async function (): Promise<void> {
      try {
        const { data: users } = await service.getAll();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      try {
        const { data: user } = await service.get(id);
        setUsers([...users, user]);
      } catch (error) {
        console.error(error);
      }
    },
    add: async function (data: User): Promise<void> {
      try {
        const { data: user } = await service.create(data);
        // TODO: is it better to pass this data through or use what is returned?
        setUsers([...users, user]);
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: User): Promise<void> {
      try {
        const { data: user } = await service.update(data, `${data._id}`);
        setUsers([...users, user]);
      } catch (error) {
        console.error(error);
      }
    },
    delete: async function (data: User): Promise<void> {
      try {
        const { data: deletedUser } = await service.delete(`${data._id}`);
        setUsers(users.filter(_user => _user._id !== deletedUser._id));
      } catch (error) {}
    },
  };

  return (
    <UsersContext.Provider
      value={{
        ...delegate,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export type ILoggedInUserContext = {
  loggedInUser: User;
  setLoggedInUser: (user: User) => void;
};

export const LoggedInUserContext = React.createContext<ILoggedInUserContext>({
  loggedInUser: emptyUser,
  setLoggedInUser: () => {},
});

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
