// Copyright 2022 Social Fabric, LLC

import { Role } from '../services/user.service';
import { School } from './schools';
import { User, UserComparator } from './users';

export type Counselor = User & {
  counselorRoomLink?: string;
  counselorRoomLink2?: string;
  counselorAssignedSchools?: School[];
};

export const emptyCounselor: Counselor = {
  id: '-1',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneIanaName: 'America/New_York',
  role: 'COUNSELOR' as Role,
  counselorRoomLink: '',
  counselorRoomLink2: '',
  counselorAssignedSchools: [],
};

export const getCounselors = (users: User[]) => {
  return users
    .filter(user => user.role === 'COUNSELOR')
    .map(counselor => counselor as Counselor)
    .sort(UserComparator);
};
