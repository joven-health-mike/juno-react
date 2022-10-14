// Copyright 2022 Social Fabric, LLC

import React, { FC, useState } from 'react';
import { Role, UserService } from '../services/user.service';
import { ContextData } from './ContextData';
import { DataProviderProps } from './DataProviderProps';
import { User } from './users';

export type Student = User & { studentRef: StudentRef };

export type StudentStatus = 'ACTIVE' | 'DISCHARGED';

export type StudentRef = {
  id: string;
  userId: string;
  assignedSchoolId: string;
  assignedCounselorId: string;
  status: StudentStatus;
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
    id: '-1',
    userId: '-1',
    assignedSchoolId: '-1',
    assignedCounselorId: '-1',
    status: 'ACTIVE',
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
        const { data: user } = await service.create(data);
        setStudents([...students, user as Student]);
      } catch (error) {
        console.error(error);
      }
    },
    update: async function (data: Student): Promise<void> {
      try {
        const { data: student } = await service.update(data, `${data.id}`);
        // remove the old student from the list
        const newStudents = [...students].filter(
          filterStudent => filterStudent.id !== data.id
        );
        // and add the new one
        newStudents.push(student as Student);
        setStudents(newStudents);
      } catch (error) {
        console.error(error);
      }
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
