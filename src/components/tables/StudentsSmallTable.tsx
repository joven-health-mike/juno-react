// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import { deletePermission } from '../../auth/permissions';
import { Student, StudentsContext } from '../../data/students';
import { LoggedInUserContext } from '../../data/users';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type StudentsSmallTableProps = {
  onDeleteClicked: (student: Student) => void;
  onAppointmentClicked: (student: Student) => void;
};

export type TableStudentSmall = {
  id: string;
  name: string;
};

const StudentsSmallTable: React.FC<StudentsSmallTableProps> = ({
  onDeleteClicked,
  onAppointmentClicked,
}) => {
  const { data: students } = useContext(StudentsContext);
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

  const getStudentFromTableStudent = useCallback(
    (tableStudent: TableStudentSmall): Student => {
      return students.find(
        student => student.id === tableStudent.id
      ) as Student;
    },
    [students]
  );

  const getButtonCell = useCallback(
    (tableStudent: TableStudentSmall, row: Row) => {
      const student = getStudentFromTableStudent(tableStudent);
      if (!student) return <></>;

      return (
        <>
          {isDeleteStudentAllowed && (
            <XButton
              text="❌"
              title="Delete Student"
              value={student.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onDeleteClicked(student);
              }}
            />
          )}
          <XButton
            text="📅"
            title="Schedule Appointment"
            value={student.id}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onAppointmentClicked(student);
            }}
          />
        </>
      );
    },
    [
      getStudentFromTableStudent,
      isDeleteStudentAllowed,
      onAppointmentClicked,
      onDeleteClicked,
    ]
  );

  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns: Column[] = React.useMemo(
    () => [
      {
        id: 'buttons',
        Cell: ({ cell, row }: CellProps<object>) => {
          const student = cell.row.original as TableStudentSmall;
          return getButtonCell(student, row);
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
    ],
    [getButtonCell]
  );

  return (
    <DataTable
      data={tableStudents}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  );
};

export default StudentsSmallTable;
