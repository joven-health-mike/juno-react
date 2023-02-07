// Copyright 2022 Social Fabric, LLC

import React, { ReactElement } from 'react';
import {
  FaUserTie,
  FaCalendarAlt,
  FaHome,
  FaCalendarCheck,
  FaUserAstronaut,
  FaUserFriends,
} from 'react-icons/fa';
import { IoMdLogOut, IoMdBusiness, IoMdContacts } from 'react-icons/io';
import styled from 'styled-components';
import image from '../../assets/Logo-192sq-alphabg.png';

const Image = styled.img`
  height: 19px;
  width: 19px;
`;

export type NavItem = {
  title: string;
  icon: ReactElement;
  path: string;
};

export const allNavItems: NavItem[] = [
  {
    title: 'Joven Health',
    icon: <Image src={image} alt="logo" />,
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
    title: 'Account',
    icon: <FaUserFriends />,
    path: '/account',
  },
  {
    title: 'Logout',
    icon: <IoMdLogOut />,
    path: '/logout',
  },
];
