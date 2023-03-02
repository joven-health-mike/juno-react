// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { AppointmentService } from '../services/appointment.service';
import { AxiosResponse } from 'axios';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';
import { School } from './schools';
import { User } from './users';

export type Appointment = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isRecurring?: boolean;
  numOccurrences?: number;
  numRepeats?: number;
  frequency?: string;
  school?: School;
  schoolId?: string;
  counselor?: User;
  counselorUserId?: string;
  participants: User[];
  type: string;
  status: string;
  location: string;
  color?: string;
};

export const emptyAppointment = {
  id: '-1',
  title: '',
  start: new Date(),
  end: new Date(),
  isRecurring: false,
  numOccurrences: 4,
  numRepeats: 1,
  frequency: 'WEEKS',
  schoolId: '',
  counselorId: '',
  participants: [] as User[],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'UNKNOWN',
};

/* <Name> + <Name> + <Name> (<SchoolName>) - <AppointmentType> */
export const generateAppointmentTitle = (
  names: string[],
  schoolName: string | undefined,
  appointmentTypeName: string
) => {
  let result = '';

  if (names.length > 0) {
    names.forEach(name => {
      result += `${name} + `;
    });

    // remove trailing '+ ' (leaving a space after the last name)
    result = result.slice(0, -2);
  }

  if (schoolName) {
    result += `(${schoolName}) - `;
  }
  result += `${appointmentTypeName}`;

  return result;
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
      // do nothing (unused)
    },
    add: async function (data: Appointment): Promise<void> {
      try {
        // since recurring meetings create multiple appointments, this response actually returns an array of appointments.
        const { data: appointment } = (await service.create(
          data
        )) as AxiosResponse<unknown>;
        const apptArray = appointment as Appointment[];
        apptArray.forEach(appt => {
          appt.participants = data.participants;
          appt.school = data.school;
          appt.counselor = data.counselor;
        });
        setAppointments([...appointments, ...apptArray]);
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
