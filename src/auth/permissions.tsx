// Copyright 2022 Social Fabric, LLC

import { Role, ROLES } from '../services/user.service';

const allRoles = ROLES;
const adminsOnly = ['SYSADMIN', 'JOVEN_ADMIN'];
const jovenStaff = ['SYSADMIN', 'JOVEN_ADMIN', 'JOVEN_STAFF'];
const everyoneExceptClients = allRoles.filter(
  role => role !== 'STUDENT' && role !== 'GUARDIAN'
);

export type AvailableRoute =
  | '/'
  | '/account'
  | '/appointments'
  | '/calendar'
  | '/counselors'
  | '/schools'
  | '/students'
  | '/users'
  | '/logout';

const pagePermissions = {
  '/': allRoles,
  '/account': allRoles,
  '/appointments': everyoneExceptClients,
  '/calendar': allRoles,
  '/counselors': everyoneExceptClients,
  '/schools': allRoles,
  '/students': everyoneExceptClients,
  '/users': adminsOnly,
  '/logout': allRoles,
};

export type AvailableDbCrudObject =
  | 'appointment'
  | 'counselor'
  | 'school'
  | 'student'
  | 'user';

const createPermissions = {
  appointment: allRoles,
  counselor: adminsOnly,
  school: adminsOnly,
  student: jovenStaff,
  user: adminsOnly,
};

const deletePermissions = {
  appointment: everyoneExceptClients,
  counselor: adminsOnly,
  school: adminsOnly,
  student: jovenStaff,
  user: adminsOnly,
};

const updatePermissions = {
  appointment: everyoneExceptClients,
  counselor: adminsOnly,
  school: adminsOnly,
  student: jovenStaff,
  user: adminsOnly,
};

export function createPermission(
  role: Role,
  createObject: AvailableDbCrudObject
) {
  return createPermissions[createObject].includes(role);
}

export function deletePermission(
  role: Role,
  deleteObject: AvailableDbCrudObject
) {
  return deletePermissions[deleteObject].includes(role);
}

export function updatePermission(
  role: Role,
  updateObject: AvailableDbCrudObject
) {
  return updatePermissions[updateObject].includes(role);
}

export function pagePermission(role: Role, route: AvailableRoute) {
  return pagePermissions[route].includes(role);
}
