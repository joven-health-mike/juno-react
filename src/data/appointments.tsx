// Copyright 2022 Social Fabric, LLC

import React from 'react';

export type Appointment = {
  _id: number;
  title: string;
  start: Date;
  end: Date;
  counselorId: number;
  studentId: number;
  color?: string;
  type: AppointmentType;
};

export const AppointmentTypes = {
  None: { _id: 0, name: 'None', color: 'lightgray' },
  Clinical: { _id: 1, name: 'Clinical', color: 'green' },
  Consultation: { _id: 2, name: 'Consultation', color: 'blue' },
  Evaluation: { _id: 3, name: 'Evaluation', color: 'red' },
};

export type AppointmentType = {
  _id: number;
  name: string;
  color: string;
};

export const getAppointmentTypeById = (id: number): AppointmentType => {
  for (const k in AppointmentTypes) {
    if (((AppointmentTypes as any)[k] as AppointmentType)._id === id) {
      return (AppointmentTypes as any)[k];
    }
  }
  return AppointmentTypes.None;
};

export const emptyAppointment = {
  _id: -1,
  title: '',
  start: new Date(),
  end: new Date(),
  counselorId: -1,
  studentId: -1,
  type: AppointmentTypes.None,
};

export const exampleAppointments = [
  {
    _id: 0,
    title: 'Johnny R (Aardvark Academy)',
    start: new Date(),
    end: new Date(),
    counselorId: 0,
    studentId: 0,
    type: AppointmentTypes.Clinical,
  },
  {
    _id: 1,
    title: 'Jennifer F (Aardvark Academy)',
    start: new Date(),
    end: new Date(),
    counselorId: 0,
    studentId: 1,
    type: AppointmentTypes.Consultation,
  },
  {
    _id: 2,
    title: 'Chris M (Aardvark Academy)',
    start: new Date(),
    end: new Date(),
    counselorId: 0,
    studentId: 2,
    type: AppointmentTypes.Evaluation,
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
