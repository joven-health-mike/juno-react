// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { Role, UserService } from '../services/user.service';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';
import { User } from './users';

export type Student = User & { studentRef: StudentRef };

// TODO: this doesn't match spec yet
export type StudentRef = {
  _id: string;
  schoolId: string;
  counselorId: string;
};

export const emptyStudent: Student = {
  id: '-1',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  docsUrl: '',
  timeZoneOffset: 0,
  role: 'STUDENT' as Role,
  studentRef: {
    _id: '-1',
    schoolId: '-1',
    counselorId: '-1',
  },
};

export const StudentsContext = React.createContext<ContextData<Student>>({
  data: [],
  getAll: () => null,
  get: (id: string) => null,
  add: (student: Student) => null,
  update: (student: Student) => null,
  delete: (student: Student) => null,
});

export const StudentsProvider: FC<DataProviderProps<Student[]>> = ({
  children,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const service = new UserService();

  const delegate: ContextData<Student> = {
    data: students,
    getAll: async function (): Promise<void> {
      try {
        const { data: students } = await service.getAllByRole('STUDENT');
        setStudents(students as Student[]);
      } catch (error) {
        console.error(error);
      }
    },
    get: async function (id: string): Promise<void> {
      // Noop
    },
    add: async function (data: Student): Promise<void> {
      try {
        const response = await service.create(data);
        if (response.status === 200) {
          setStudents([...students, data]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: Student): Promise<void> {
      //TODO: how do we update this info on the server?
      let updatedStudent = students.find(student => student.id === data.id);
      let filteredStudents = students.filter(
        student => student.id === updatedStudent?.id
      );
      setStudents([...filteredStudents, data]);
      /* try {
        const { data: student } = await service.update(data, `${data.id}`);
        setStudents([...students, student]);
      } catch (error) {
        console.error(error);
      } */
    },
    delete: async function (data: Student): Promise<void> {
      try {
        const { data: deletedStudent } = await service.delete(`${data.id}`);
        setStudents(
          students.filter(_student => _student.id !== deletedStudent.id)
        );
      } catch (error) {}
    },
  };

  return (
    <StudentsContext.Provider
      value={{
        ...delegate,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};
