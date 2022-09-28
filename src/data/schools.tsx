// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { SchoolService } from '../services/school.service';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';

export type School = {
  _id: number;
  name: string;
  email: string;
};

export const emptySchool = {
  _id: -1,
  name: '',
  email: '',
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
        // TODO: is it better to pass this data through or use what is returned?
        setSchools([...schools, school]);
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: School): Promise<void> {
      try {
        const { data: school } = await service.update(data, `${data._id}`);
        setSchools([...schools, school]);
      } catch (error) {
        console.error(error);
      }
    },
    delete: async function (data: School): Promise<void> {
      try {
        const { data: deletedSchool } = await service.delete(`${data._id}`);
        setSchools(
          schools.filter(_school => _school._id !== deletedSchool._id)
        );
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
