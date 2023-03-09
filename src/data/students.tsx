// Copyright 2022 Social Fabric, LLC

import { Role } from '../services/user.service';
import { User } from './users';

export type Student = User & {
  studentAssignedCounselorId?: string;
  studentAssignedSchoolId?: string;
  studentStatus: StudentStatus;
};

export type StudentStatus = 'ACTIVE' | 'DISCHARGED';

export const emptyStudent: Student = {
  id: '-1',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneIanaName: '',
  role: 'STUDENT' as Role,
  studentStatus: 'ACTIVE' as StudentStatus,
};

export const getActiveStudents = (users: User[]) => {
  return users
    .filter(
      user =>
        user.role === 'STUDENT' &&
        (user as Student).studentStatus !== 'DISCHARGED'
    )
    .map(student => student as Student);
};
