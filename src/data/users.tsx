// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { Role, UserService } from '../services/user.service';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  username: string;
  phone?: string;
  docsUrl?: string;
  timeZoneOffset?: number;
  role: Role;
};

export const emptyUser = {
  id: '-1',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneOffset: 0,
  role: 'JOVEN_STAFF' as Role,
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
        const { data: user } = await service.update(data, `${data.id}`);
        setUsers([...users, user]);
      } catch (error) {
        console.error(error);
      }
    },
    delete: async function (data: User): Promise<void> {
      try {
        const { data: deletedUser } = await service.delete(`${data.id}`);
        setUsers(users.filter(_user => _user.id !== deletedUser.id));
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
  setLoggedInUser: (user: User) => null,
});
