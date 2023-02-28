// Copyright 2022 Social Fabric, LLC

import { useContext } from 'react';
import { Role } from '../services/user.service';
import { School } from './schools';
import { User, UsersContext } from './users';

export type Counselor = User & {
  counselorRoomLink?: string;
  counselorAssignedSchools?: School[];
}; // TODO: Sync with server model

export const emptyCounselor: Counselor = {
  id: '-1',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneIanaName: '',
  role: 'JOVEN_STAFF' as Role,
  counselorRoomLink: '',
  counselorAssignedSchools: [],
};

export const useCounselors = () => {
  const { data: users } = useContext(UsersContext);
  return users
    .filter(user => user.role === 'COUNSELOR')
    .map(counselor => counselor as Counselor);
};
