// Copyright 2022 Social Fabric, LLC

import React from 'react';

export type Appointment = {
  _id: number;
  title: string;
  start: Date;
  end: Date;
  counselorId: number;
  studentId: number;
};

export const emptyAppointment = {
  _id: -1,
  title: '',
  start: new Date(),
  end: new Date(),
  counselorId: -1,
  studentId: -1,
};

export const exampleAppointments = [
  {
    _id: 0,
    title: 'Johnny R',
    start: new Date(),
    end: new Date(),
    counselorId: 0,
    studentId: 0,
  },
  {
    _id: 1,
    title: 'Jennifer F',
    start: new Date(),
    end: new Date(),
    counselorId: 0,
    studentId: 1,
  },
  {
    _id: 2,
    title: 'Chris M',
    start: new Date(),
    end: new Date(),
    counselorId: 0,
    studentId: 2,
  },
];

export type IAppointmentsContext = {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
};

export const AppointmentsContext = React.createContext<IAppointmentsContext>({
  appointments: exampleAppointments,
  setAppointments: () => {},
});
