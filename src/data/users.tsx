// Copyright 2022 Social Fabric, LLC

import React, { FC, useContext, useState } from 'react';
import { Role, UserService } from '../services/user.service';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  username?: string;
  phone?: string;
  docsUrl?: string;
  timeZoneIanaName?: string;
  role: Role;
  guardianStudents?: User[];
  studentAssignedCounselorId?: string;
  studentAssignedSchoolId?: string;
  schoolAdminAssignedSchoolId?: string;
  schoolStaffAssignedSchoolId?: string;
};

export const emptyUser = {
  id: '-1',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneIanaName: '',
  role: 'UNASSIGNED' as Role,
};

export const UsersContext = React.createContext<ContextData<User>>({
  data: [],
  getAll: () => null,
  get: (id: string) => null,
  add: (user: User) => null,
  update: (user: User) => null,
  delete: (user: User) => null,
});

export const UserComparator = (a: User, b: User) => {
  const aName = `${a.firstName} ${a.lastName}`;
  const bName = `${b.firstName} ${b.lastName}`;

  if (aName < bName) return -1;
  if (aName > bName) return 1;
  return 0;
};

export const UsersProvider: FC<DataProviderProps<User[]>> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const service = new UserService();

  const delegate: ContextData<User> = {
    data: users,
    getAll: async function (): Promise<void> {
      try {
        const { data: users } = await service.getAll();
        setUsers(users.sort(UserComparator));
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      // do nothing - unused function
    },
    add: async function (data: User): Promise<void> {
      try {
        const { data: user } = await service.create(data);
        setUsers([...users, user].sort(UserComparator));
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: User): Promise<void> {
      try {
        const { data: user } = await service.update(data, `${data.id}`);
        // remove the old user from the list
        const newUsers = [...users].filter(user => user.id !== data.id);
        // and add the new one
        newUsers.push(user);
        setUsers(newUsers.sort(UserComparator));

        if (user.id === loggedInUser.id) {
          setLoggedInUser(user);
        }
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
