// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { AppointmentService } from '../services/appointment.service';
import { ContextData } from './ContextData';
import { CounselorRef } from './counselors';
import { DataProviderProps } from './DataProviderProps';
import { School } from './schools';
import { User } from './users';

export type Appointment = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isRecurring?: boolean;
  school?: School;
  schoolId?: string;
  counselor?: CounselorRef;
  counselorId?: string;
  participants: User[];
  type: string;
  status: string;
  color?: string;
};

export const emptyAppointment = {
  id: '-1',
  title: '',
  start: new Date(),
  end: new Date(),
  isRecurring: false,
  schoolId: '',
  counselorId: '',
  participants: [],
  type: 'CLINICAL',
  status: 'SCHEDULED',
};

export const AppointmentTypes = {
  Clinical: { id: 0, name: 'CLINICAL', color: 'green' },
  Consultation: { id: 1, name: 'CONSULTATION', color: 'blue' },
  Evaluation: { id: 2, name: 'EVALUATION', color: 'red' },
};

const defaultAppointmentColor = 'lightgray';
const defaultAppointmentType = AppointmentTypes.Clinical;

export type AppointmentType = {
  id: number;
  name: string;
  color: string;
};

export const getColorForType = (type: string) => {
  for (const k in AppointmentTypes) {
    if (((AppointmentTypes as any)[k] as AppointmentType).name === type) {
      return (AppointmentTypes as any)[k].color;
    }
  }

  return defaultAppointmentColor;
};

export const getAppointmentTypeById = (id: number): AppointmentType => {
  for (const k in AppointmentTypes) {
    if (((AppointmentTypes as any)[k] as AppointmentType).id === id) {
      return (AppointmentTypes as any)[k];
    }
  }
  return defaultAppointmentType;
};

export const AppointmentsContext = React.createContext<
  ContextData<Appointment>
>({
  data: [],
  getAll: () => null,
  get: (id: string) => null,
  add: (appointment: Appointment) => null,
  update: (appointment: Appointment) => null,
  delete: (appointment: Appointment) => null,
});

export const AppointmentsProvider: FC<DataProviderProps<Appointment[]>> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [syntheticAppointments, setSyntheticAppointments] = useState<
    Appointment[]
  >([]);
  const service = new AppointmentService();

  const addDays = (date: Date, numDays: number) => {
    const dateVal = new Date(date.valueOf());
    dateVal.setDate(dateVal.getDate() + numDays);
    return dateVal;
  };

  const processRecurringAppointments = (appointments: Appointment[]) => {
    const result = [...appointments];
    for (const appointment of appointments) {
      if (appointment.isRecurring) {
        for (let i = 0; i < 6; i++) {
          const newAppointment = { ...appointment };
          newAppointment.start = addDays(newAppointment.start, (i + 1) * 7);
          newAppointment.end = addDays(newAppointment.end, (i + 1) * 7);
          result.push(newAppointment);
        }
      }
    }

    return result;
  };

  const delegate: ContextData<Appointment> = {
    data: syntheticAppointments,
    getAll: async function (): Promise<void> {
      try {
        const { data: appointments } = await service.getAll();
        setAppointments(appointments);
        const allAppointments = processRecurringAppointments(appointments);
        setSyntheticAppointments(allAppointments);
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      // do nothing (unused)
    },
    add: async function (data: Appointment): Promise<void> {
      try {
        const { data: appointment } = await service.create(data);
        appointment.participants = data.participants;
        appointment.counselor = data.counselor;
        appointment.school = data.school;
        const newAppointments = [...appointments, appointment];
        setAppointments(newAppointments);
        const allAppointments = processRecurringAppointments(newAppointments);
        setSyntheticAppointments(allAppointments);
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: Appointment): Promise<void> {
      try {
        const { data: appointment } = await service.update(data, `${data.id}`);
        appointment.participants = data.participants;
        appointment.counselor = data.counselor;
        appointment.school = data.school;
        const newAppointments = [...appointments].filter(
          appointment => appointment.id !== data.id
        );
        newAppointments.push(appointment);
        setAppointments(newAppointments);
        const allAppointments = processRecurringAppointments(newAppointments);
        setSyntheticAppointments(allAppointments);
      } catch (error) {
        console.error(error);
      }
    },
    delete: async function (data: Appointment): Promise<void> {
      try {
        const { data: deletedAppointment } = await service.delete(`${data.id}`);
        setAppointments(
          appointments.filter(
            appointment => appointment.id !== deletedAppointment.id
          )
        );
      } catch (error) {}
    },
  };

  return (
    <AppointmentsContext.Provider
      value={{
        ...delegate,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
