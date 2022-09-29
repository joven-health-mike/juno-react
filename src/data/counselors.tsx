// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { emptyUser, User } from './users';

export type Counselor = {
  _id: number;
  name: string;
  email: string;
  roomLink: string;
  user: User;
};

export const emptyCounselor = {
  _id: -1,
  name: '',
  email: '',
  roomLink: '',
  user: emptyUser,
};

export const exampleCounselors = [
  {
    _id: 0,
    name: 'Jacek McGuinness',
    email: 'jacek-mcguinness@jovenhealth.com',
    roomLink: 'https://jovenhealth.com/room-jacek',
    user: emptyUser,
  },
];

export type ICounselorsContext = {
  counselors: Counselor[];
  setCounselors: (counselors: Counselor[]) => void;
};

export const CounselorsContext = React.createContext<ICounselorsContext>({
  counselors: exampleCounselors,
  setCounselors: () => {},
});
