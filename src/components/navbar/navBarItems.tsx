// Copyright 2022 Social Fabric, LLC

import React, { ReactElement } from 'react';
import {
  FaUserTie,
  FaCalendarAlt,
  FaHome,
  FaCalendarCheck,
  FaUserAstronaut,
} from 'react-icons/fa';
import { IoMdLogOut, IoMdBusiness, IoMdContacts } from 'react-icons/io';
import image from '../../assets/Logo-192sq-alphabg.png';
import { Role } from '../../data/users';

export const ROLES = [
  'JOVEN_ADMIN',
  'JOVEN_STAFF',
  'SCHOOL_ADMIN',
  'SCHOOL_STAFF',
  'STUDENT',
  'GUARDIAN',
  'COUNSELOR',
  'SYSADMIN',
];

export function getItems(role: Role) {
  switch (role) {
    case 'JOVEN_ADMIN' as Role:
      return allItems;
    case 'JOVEN_STAFF' as Role:
      return allItems;
    case 'SCHOOL_ADMIN' as Role:
      return allItems;
    case 'SCHOOL_STAFF' as Role:
      return allItems;
    case 'STUDENT' as Role:
      return allItems;
    case 'GUARDIAN' as Role:
      return allItems;
    case 'COUNSELOR' as Role:
      return allItems;
    case 'SYSADMIN' as Role:
      return allItems;
    default:
      // throw new Error();
      return allItems;
  }
}

export type NavItem = {
  title: string;
  icon: ReactElement;
  path: string;
};

const allItems: NavItem[] = [
  {
    title: 'Joven Health',
    icon: <img src={image} alt="logo" />,
    path: '/',
  },
  {
    title: 'Home',
    icon: <FaHome />,
    path: '/',
  },
  {
    title: 'Appointments',
    icon: <FaCalendarCheck />,
    path: '/appointments',
  },
  {
    title: 'Calendar',
    icon: <FaCalendarAlt />,
    path: '/calendar',
  },
  {
    title: 'Counselors',
    icon: <FaUserTie />,
    path: '/counselors',
  },
  {
    title: 'Schools',
    icon: <IoMdBusiness />,
    path: '/schools',
  },
  {
    title: 'Students',
    icon: <IoMdContacts />,
    path: '/students',
  },
  {
    title: 'Users',
    icon: <FaUserAstronaut />,
    path: '/users',
  },
  {
    title: 'Logout',
    icon: <IoMdLogOut />,
    path: '/logout',
  },
];
