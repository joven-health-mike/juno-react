// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { AppointmentService } from '../services/appointment.service';
import { rrulestr } from 'rrule';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';
import { School } from './schools';
import { User } from './users';

export type Appointment = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isSeries?: boolean;
  seriesId?: string;
  seriesRule?: string;
  seriesExceptions?: string[];
  seriesProtoId?: string;
  school?: School;
  schoolId?: string;
  counselor?: User;
  counselorUserId?: string;
  participants: User[];
  type: string;
  status: string;
  location: string;
  color?: string;
  getSeriesVirtualAppointments?: () => Appointment[];
};

export const emptyAppointment = {
  id: '-1',
  title: '',
  start: new Date(),
  end: new Date(new Date().getTime() + 60000 * 30),
  isSeries: false,
  seriesRule: '',
  seriesExceptions: [],
  seriesProtoId: '',
  schoolId: '',
  counselorUserId: '',
  participants: [] as User[],
  type: 'CLINICAL',
  status: 'SCHEDULED',
  location: 'VIRTUAL_SCHOOL',
};

const AppointmentComparator = (a: Appointment, b: Appointment) => {
  const aDate = new Date(a.start);
  const bDate = new Date(b.start);

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
        appointments.forEach(appointment => {
          if (appointment.isSeries) {
            appointments.push(...getSeriesVirtualAppointments(appointment));
          }
        });
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
        const { data: appointment } = await service.create(data);
        const newAppointments = [...appointments, appointment];
        if (appointment.isSeries) {
          newAppointments.push(...getSeriesVirtualAppointments(appointment));
        }
        setAppointments(newAppointments.sort(AppointmentComparator));
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
        // TODO: handle "deleting" a virtual appointment (add it to exception list)
        const { data: deletedAppointment } = await service.delete(`${data.id}`);
        setAppointments(
          appointments
            // remove deleted appointment
            .filter(appointment => appointment.id !== deletedAppointment.id)
            // remove virtual appointments (if deleted appointment was a series)
            .filter(
              appointment => appointment.seriesProtoId !== deletedAppointment.id
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

const getSeriesVirtualAppointments = (appointment: Appointment) => {
  const series: Appointment[] = [];
  const rrule = rrulestr(appointment.seriesRule!);
  const futureDates = rrule.all().slice(1); // get all appointment dates, skipping the original one

  futureDates.forEach(virtualDate => {
    const virtualAppointment = { ...appointment };
    virtualAppointment.id = '-1';
    const duration =
      new Date(appointment.end).getTime() -
      new Date(appointment.start).getTime();
    virtualAppointment.start = new Date(virtualDate);
    virtualAppointment.end = new Date(
      virtualAppointment.start.getTime() + duration
    );
    series.push(virtualAppointment);
  });

  return series;
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
