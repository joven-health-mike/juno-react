// Copyright 2022 Social Fabric, LLC

import { AvailableRoute } from '../routes/AppRouter';
import { Role, ROLES } from '../services/user.service';

const allRoles = ROLES;
const adminsOnly = ['SYSADMIN', 'JOVEN_ADMIN'];

const pagePermissions = {
  '/': allRoles,
  '/account': allRoles,
  '/appointments': allRoles,
  '/calendar': allRoles,
  '/counselors': allRoles,
  '/schools': allRoles,
  '/students': allRoles,
  '/users': adminsOnly,
  '/logout': allRoles,
};

export function pagePermission(role: Role, route: AvailableRoute) {
  return pagePermissions[route].includes(role);
}
