// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { AppointmentService } from '../services/appointment.service';
import { ContextData } from './ContextData';
import { Counselor, emptyCounselor } from './counselors';
import { DataProviderProps } from './DataProviderProps';
import { emptySchool, School } from './schools';
import { User } from './users';

export type Appointment = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  school: School;
  counselor: Counselor;
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
  school: emptySchool,
  counselor: emptyCounselor,
  participants: [],
  type: '',
  status: '',
};

export const AppointmentTypes = {
  None: { _id: 0, name: 'NONE', color: 'lightgray' },
  Clinical: { _id: 1, name: 'CLINICAL', color: 'green' },
  Consultation: { _id: 2, name: 'CONSULTATION', color: 'blue' },
  Evaluation: { _id: 3, name: 'EVALUATION', color: 'red' },
};

export type AppointmentType = {
  _id: number;
  name: string;
  color: string;
};

export const getColorForType = (type: string) => {
  for (const k in AppointmentTypes) {
    if (((AppointmentTypes as any)[k] as AppointmentType).name === type) {
      return (AppointmentTypes as any)[k].color;
    }
  }

  return AppointmentTypes.None.color;
};

export const getAppointmentTypeById = (id: number): AppointmentType => {
  for (const k in AppointmentTypes) {
    if (((AppointmentTypes as any)[k] as AppointmentType)._id === id) {
      return (AppointmentTypes as any)[k];
    }
  }
  return AppointmentTypes.None;
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
  const service = new AppointmentService();

  const delegate: ContextData<Appointment> = {
    data: appointments,
    getAll: async function (): Promise<void> {
      try {
        const { data: appointments } = await service.getAll();
        setAppointments(appointments);
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      try {
        const { data: appointment } = await service.get(id);
        setAppointments([...appointments, appointment]);
      } catch (error) {
        console.error(error);
      }
    },
    add: async function (data: Appointment): Promise<void> {
      try {
        const { data: appointment } = await service.create(data);
        // TODO: is it better to pass this data through or use what is returned?
        setAppointments([...appointments, appointment]);
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: Appointment): Promise<void> {
      try {
        const { data: appointment } = await service.update(data, `${data.id}`);
        setAppointments([...appointments, appointment]);
      } catch (error) {
        console.error(error);
      }
    },
    delete: async function (data: Appointment): Promise<void> {
      try {
        const { data: deletedAppointment } = await service.delete(`${data.id}`);
        setAppointments(
          appointments.filter(
            _appointment => _appointment.id !== deletedAppointment.id
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
