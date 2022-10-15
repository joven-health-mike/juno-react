// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { Role, UserService } from '../services/user.service';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';
import { User } from './users';

export type Counselor = User & { counselorRef: CounselorRef };

export type CounselorRef = {
  id: string;
  userId: string;
  roomLink: string;
  user?: User;
};

export const emptyCounselor: Counselor = {
  id: '-1',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneOffset: 0,
  role: 'JOVEN_STAFF' as Role,
  counselorRef: {
    id: '-1',
    userId: '-1',
    roomLink: '',
  },
};

export const emptyCounselorRef: CounselorRef = {
  id: '-1',
  userId: '-1',
  roomLink: '',
  user: {
    id: '-1',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    docsUrl: '',
    timeZoneOffset: 0,
    role: 'JOVEN_STAFF' as Role,
  },
};

export const CounselorsContext = React.createContext<ContextData<Counselor>>({
  data: [],
  getAll: () => null,
  get: (id: string) => null,
  add: (counselor: Counselor) => null,
  update: (counselor: Counselor) => null,
  delete: (counselor: Counselor) => null,
});

export const CounselorsProvider: FC<DataProviderProps<Counselor[]>> = ({
  children,
}) => {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const service = new UserService();

  const delegate: ContextData<Counselor> = {
    data: counselors,
    getAll: async function (): Promise<void> {
      try {
        const { data: counselors } = await service.getAllByRole('COUNSELOR');
        setCounselors(counselors as Counselor[]);
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      // NOOP
    },
    add: async function (data: Counselor): Promise<void> {
      try {
        const { data: user } = await service.create(data);
        setCounselors([...counselors, user as Counselor]);
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: Counselor): Promise<void> {
      try {
        const { data: counselor } = await service.update(data, `${data.id}`);
        // remove the old counselor from the list
        const newCounselors = [...counselors].filter(
          counselor => counselor.id !== counselor.counselorRef.id
        );
        // and add the new counselor returned from the server
        setCounselors([...newCounselors, counselor as Counselor]);
      } catch (error) {
        console.error(error);
      }
    },
    delete: async function (data: Counselor): Promise<void> {
      try {
        const { data: deletedCounselor } = await service.delete(`${data.id}`);
        setCounselors(
          counselors.filter(_counselor => _counselor.id !== deletedCounselor.id)
        );
      } catch (error) {}
    },
  };

  return (
    <CounselorsContext.Provider
      value={{
        ...delegate,
      }}
    >
      {children}
    </CounselorsContext.Provider>
  );
};
