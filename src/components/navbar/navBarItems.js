// Copyright 2022 Social Fabric, LLC

import React from 'react';
import {
  FaUserTie,
  FaCalendarAlt,
  FaHome,
  FaCalendarCheck,
  FaUserAstronaut,
} from 'react-icons/fa';
import { IoMdLogOut, IoMdBusiness, IoMdContacts } from 'react-icons/io';
import image from '../../assets/Logo-192sq-alphabg.png'; // TODO: How do we import images in TS?

export function getItems(role) {
  switch (role) {
    case 'admin':
      return allItems;
    case 'counselor':
      return allItems;
    case 'facilitator':
      return allItems;
    case 'school':
      return allItems;
    case 'student':
      return allItems;
    case 'guardian':
      return allItems;
    default:
      throw new Error();
  }
}

const allItems = [
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
