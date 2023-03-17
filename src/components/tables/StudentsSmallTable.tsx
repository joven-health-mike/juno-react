// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { deletePermission } from '../../auth/permissions';
import { getActiveStudents, Student } from '../../data/students';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import MaterialTable from './MaterialTable';

type StudentsSmallTableProps = {
  onDeleteClicked: (student: Student) => void;
  onAppointmentClicked: (student: Student) => void;
  onOpenFileClicked: (student: Student) => void;
};

export type TableStudentSmall = {
  id: string;
  name: string;
};

const StudentsSmallTable: React.FC<StudentsSmallTableProps> = ({
  onDeleteClicked,
  onAppointmentClicked,
  onOpenFileClicked,
}) => {
  const { data: users } = useContext(UsersContext);
  const students = useMemo(() => getActiveStudents(users), [users]);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteStudentAllowed, setIsDeleteStudentAllowed] =
    useState<boolean>(false);
  const [tableStudents, setTableStudents] = useState<TableStudentSmall[]>([]);

  useEffect(() => {
    setIsDeleteStudentAllowed(deletePermission(loggedInUser.role, 'student'));
  }, [loggedInUser.role]);

  useEffect(() => {
    const mappedStudents = students.map(student => {
      return {
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
      } as TableStudentSmall;
    });

    setTableStudents(mappedStudents);
  }, [students]);

  const createTableData = (students: TableStudentSmall[]) => {
    const tableData: string[][] = [];

    students.forEach(student => {
      tableData.push([student.id, student.name]);
    });

    return tableData;
  };

  const onDeleteRow = isDeleteStudentAllowed
    ? (id: string) => {
        const student = students.find(student => student.id === id);
        onDeleteClicked(student!);
      }
    : undefined;

  const onFolderRow = (id: string) => {
    const student = students.find(student => student.id === id);
    onOpenFileClicked(student!);
  };

  const onAppointmentRow = (id: string) => {
    const student = students.find(student => student.id === id);
    onAppointmentClicked(student!);
  };

  return (
    <MaterialTable
      rows={createTableData(tableStudents)}
      columnHeaders={['id', 'Name']}
      hideColumnIndexes={[0]}
      tableButtonInfo={{
        onDeleteRow,
        onFolderRow,
        onAppointmentRow,
      }}
    />
  );
};

export default StudentsSmallTable;
