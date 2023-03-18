// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { SchoolService } from '../services/school.service';
import { AvailableTimeZone } from '../utils/DateUtils';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';

export type School = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  timeZoneIanaName?: AvailableTimeZone;
  primaryEmail?: string;
  primaryPhone?: string;
  docsUrl?: string;
};

export const emptySchool = {
  id: '-1',
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  timeZoneIanaName: 'America/New_York' as AvailableTimeZone,
  primaryEmail: '',
  primaryPhone: '',
  docsUrl: '',
};

export const SchoolsContext = React.createContext<ContextData<School>>({
  data: [],
  getAll: () => null,
  get: (id: string) => null,
  add: (school: School) => null,
  update: (school: School) => null,
  delete: (school: School) => null,
});

export const SchoolsProvider: FC<DataProviderProps<School[]>> = ({
  children,
}) => {
  const [schools, setSchools] = useState<School[]>([]);
  const service = new SchoolService();

  const delegate: ContextData<School> = {
    data: schools,
    getAll: async function (): Promise<void> {
      try {
        const { data: schools } = await service.getAll();
        setSchools(schools);
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      try {
        const { data: school } = await service.get(id);
        setSchools([...schools, school]);
      } catch (error) {
        console.error(error);
      }
    },
    add: async function (data: School): Promise<void> {
      try {
        const { data: school } = await service.create(data);
        setSchools([...schools, school]);
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: School): Promise<void> {
      try {
        const { data: updatedSchool } = await service.update(
          data,
          `${data.id}`
        );
        // remove the old school from the schools list
        const newSchools = schools.filter(
          school => school.id !== updatedSchool.id
        );
        // and add the updated one
        setSchools([...newSchools, updatedSchool]);
      } catch (error) {
        console.error(error);
      }
    },
    delete: async function (data: School): Promise<void> {
      try {
        const { data: deletedSchool } = await service.delete(`${data.id}`);
        setSchools(schools.filter(_school => _school.id !== deletedSchool.id));
      } catch (error) {}
    },
  };

  return (
    <SchoolsContext.Provider
      value={{
        ...delegate,
      }}
    >
      {children}
    </SchoolsContext.Provider>
  );
};
