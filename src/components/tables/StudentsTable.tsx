// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import styled from 'styled-components';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student, StudentsContext } from '../../data/students';
import { LoggedInUserContext } from '../../data/users';
import XButton from '../buttons/XButton';
import StudentDetails from '../details/StudentDetails';
import { buttonStyles } from '../styles/mixins';
import DataTable from './DataTable';
import { TableStudentSmall } from './StudentsSmallTable';
import TableSearchFilter from './TableSearchFilter';

const Button = styled.button`
  ${buttonStyles}
`;

type StudentsTableProps = {
  onDeleteClicked: (student: Student) => void;
  onEditClicked: (student: Student) => void;
  onAppointmentClicked: (student: Student) => void;
  onOpenFileClicked: (student: Student) => void;
};

export type TableStudent = TableStudentSmall & {
  schoolName: string;
  counselorName: string;
};

const StudentsTable: React.FC<StudentsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onAppointmentClicked,
  onOpenFileClicked,
}) => {
  const { data: counselors } = useContext(CounselorsContext);
  const { data: schools } = useContext(SchoolsContext);
  const { data: students } = useContext(StudentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteStudentAllowed, setIsDeleteStudentAllowed] =
    useState<boolean>(false);
  const [isUpdateStudentAllowed, setIsUpdateStudentAllowed] =
    useState<boolean>(false);
  const [tableStudents, setTableStudents] = useState<TableStudent[]>([]);

  useEffect(() => {
    setIsDeleteStudentAllowed(deletePermission(loggedInUser.role, 'student'));
    setIsUpdateStudentAllowed(updatePermission(loggedInUser.role, 'student'));
  }, [loggedInUser.role]);

  useEffect(() => {
    const mappedStudents = students.map(student => {
      const schoolName = schools.find(
        school => school.id === student.studentAssignedSchoolId
      )?.name;
      const counselor = counselors.find(
        counselor => counselor.id === student.studentAssignedCounselorId
      );
      const counselorName = `${counselor?.firstName} ${counselor?.lastName}`;

      return {
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
        schoolName: schoolName,
        counselorName: counselorName,
      } as TableStudent;
    });

    setTableStudents(mappedStudents);
  }, [counselors, schools, students]);

  const getStudentFromTableStudent = useCallback(
    (tableStudent: TableStudent): Student => {
      return students.find(
        student => student.id === tableStudent.id
      ) as Student;
    },
    [students]
  );

  const getButtonCell = useCallback(
    (tableStudent: TableStudent, row: Row) => {
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
          {isUpdateStudentAllowed && (
            <XButton
              text="✏️"
              title="Edit Student"
              value={student.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onEditClicked(student);
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
          <XButton
            text="📁"
            title={`Open ${student.firstName}'s File`}
            value={student.id}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onOpenFileClicked(student);
            }}
          />
          <Button {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </Button>
        </>
      );
    },
    [
      getStudentFromTableStudent,
      isDeleteStudentAllowed,
      isUpdateStudentAllowed,
      onAppointmentClicked,
      onDeleteClicked,
      onEditClicked,
      onOpenFileClicked,
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
          const student = cell.row.original as TableStudent;
          return getButtonCell(student, row);
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'School',
        accessor: 'schoolName',
      },
      {
        Header: 'Counselor',
        accessor: 'counselorName',
      },
    ],
    [getButtonCell]
  );

  const renderRowSubComponent = useCallback(
    (row: Row) => {
      const tableStudent = row.original as TableStudent;
      const student = getStudentFromTableStudent(tableStudent);
      return <StudentDetails student={student} />;
    },
    [getStudentFromTableStudent]
  );

  return (
    <DataTable
      data={tableStudents}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

export default StudentsTable;
