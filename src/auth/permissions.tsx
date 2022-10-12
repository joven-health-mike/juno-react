// Copyright 2022 Social Fabric, LLC

import { AvailableRoute } from '../routes/AppRouter';
import { Role, ROLES } from '../services/user.service';

const allRoles = ROLES;

const pagePermissions = {
  '/': allRoles,
  '/appointments': allRoles,
  '/calendar': allRoles,
  '/counselors': allRoles,
  '/schools': allRoles,
  '/students': allRoles,
  '/users': ['SYSADMIN', 'JOVEN_ADMIN'],
  '/logout': allRoles,
};

export function pagePermission(role: Role, route: AvailableRoute) {
  return pagePermissions[route].includes(role);
}
