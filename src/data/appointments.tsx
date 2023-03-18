// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { AppointmentService } from '../services/appointment.service';
import { AxiosResponse } from 'axios';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';
import { School } from './schools';
import { User } from './users';
import { formatDate } from '../utils/DateUtils';

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
  end: new Date(new Date().getTime() + 60000 * 30),
  isRecurring: false,
  numOccurrences: 4,
  numRepeats: 1,
  frequency: 'WEEKS',
  schoolId: '',
  counselorUserId: '',
  participants: [] as User[],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'VIRTUAL_SCHOOL',
};

const AppointmentComparator = (a: Appointment, b: Appointment) => {
  const aDate = formatDate(new Date(a.start));
  const bDate = formatDate(new Date(b.start));

  if (aDate < bDate) return -1;
  if (aDate > bDate) return 1;
  return 0;
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

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CANCELLED'
  | 'ONGOING'
  | 'FINISHED'
  | 'DELETED';

export const APPOINTMENT_STATUSES = [
  'SCHEDULED',
  'CANCELLED',
  'ONGOING',
  'FINISHED',
  'DELETED',
];

export type AppointmentLocation =
  | 'VIRTUAL_SCHOOL'
  | 'VIRTUAL_HOME'
  | 'IN_PERSON'
  | 'UNKNOWN';

export const APPOINTMENT_LOCATIONS = [
  'VIRTUAL_SCHOOL',
  'VIRTUAL_HOME',
  'IN_PERSON',
  'UNKNOWN',
];

export type AppointmentType = 'CLINICAL' | 'CONSULTATION' | 'EVALUATION';
export const APPOINTMENT_TYPES = ['CLINICAL', 'CONSULTATION', 'EVALUATION'];
export const AppointmentColors = ['green', 'blue', 'red'];

export type RecurringFrequency = 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';
export const RECURRING_FREQUENCIES = ['DAYS', 'WEEKS', 'MONTHS', 'YEARS'];

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
        setAppointments(appointments.sort(AppointmentComparator));
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      // do nothing - unused function
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
        setAppointments(
          [...appointments, ...apptArray].sort(AppointmentComparator)
        );
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
        setAppointments(newAppointments.sort(AppointmentComparator));
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

export const getTableColumnHeadersForAppointments = (
  appointments: Appointment[]
): string[] => {
  return ['id', 'Title', 'Start', 'End'];
};

export const getTableDataForAppointments = (
  appointments: Appointment[]
): string[][] => {
  return appointments.map(appointment => [
    appointment.id,
    appointment.title,
    new Date(appointment.start).toISOString(),
    new Date(appointment.end).toISOString(),
  ]);
};
