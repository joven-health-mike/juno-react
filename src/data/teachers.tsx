// Copyright 2022 Social Fabric, LLC

import { Role } from '../services/user.service';
import { emptyStudent, Student } from './students';
import { User } from './users';

export type Teacher = Student; //teacher has the same info as Student

export const emptyTeacher = { ...emptyStudent, role: 'TEACHER' as Role };

export const getActiveTeachers = (users: User[]) => {
  return users
    .filter(
      user =>
        user.role === 'TEACHER' &&
        (user as Teacher).studentStatus !== 'DISCHARGED'
    )
    .map(teacher => teacher as Teacher);
};
