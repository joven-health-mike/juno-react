// Copyright 2022 Social Fabric, LLC

import React from 'react';

export type Counselor = {
  _id: number;
  name: string;
  email: string;
  roomLink: string;
};

export const emptyCounselor = {
  _id: -1,
  name: '',
  email: '',
  roomLink: '',
};

export const exampleCounselors = [
  {
    _id: 0,
    name: 'Jacek McGuinness',
    email: 'jacek-mcguinness@jovenhealth.com',
    roomLink: 'https://jovenhealth.com/room-jacek',
  },
];

type ICounselorsContext = {
  counselors: Counselor[];
  setCounselors: any;
};

export const CounselorsContext = React.createContext<ICounselorsContext>({
  counselors: exampleCounselors,
  setCounselors: () => {},
});
