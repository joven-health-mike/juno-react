// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student, StudentsContext } from '../../data/students';
import { LoggedInUserContext } from '../../data/users';
import XButton from '../buttons/XButton';
import StudentDetails from '../details/StudentDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type StudentsTableProps = {
  onDeleteClicked: (student: Student) => void;
  onEditClicked: (student: Student) => void;
  onAppointmentClicked: (student: Student) => void;
};

const StudentsTable: React.FC<StudentsTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onAppointmentClicked,
}) => {
  const { data: counselors } = useContext(CounselorsContext);
  const { data: schools } = useContext(SchoolsContext);
  const { data: students } = useContext(StudentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteStudentAllowed, setIsDeleteStudentAllowed] =
    useState<boolean>(false);
  const [isUpdateStudentAllowed, setIsUpdateStudentAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsDeleteStudentAllowed(deletePermission(loggedInUser.role, 'student'));
    setIsUpdateStudentAllowed(updatePermission(loggedInUser.role, 'student'));
  }, [loggedInUser.role]);

  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns: Column[] = React.useMemo(
    () => [
      {
        id: 'expander',
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <button {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </button>
        ),
        Cell: ({ cell, row }: CellProps<object>) => {
          const student = cell.row.original as Student;

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
              <button {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '👇' : '👉'}
              </button>
            </>
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'id',
        Cell: ({ cell }: CellProps<object>) => (
          <p>
            {(() => {
              const student = cell.row.original as Student;
              return (
                <>
                  {student
                    ? `${student.firstName} ${student.lastName}`
                    : 'Not Found'}
                </>
              );
            })()}
          </p>
        ),
      },
      {
        Header: 'School',
        accessor: 'assignedSchoolId',
        Cell: ({ cell }: CellProps<object>) => (
          <p>
            {(() => {
              const student = cell.row.original as Student;
              const foundSchool = schools.find(
                school => school.id === student.studentRef.assignedSchoolId
              );
              return <>{foundSchool ? foundSchool.name : 'Not Found'}</>;
            })()}
          </p>
        ),
      },
      {
        Header: 'Counselor',
        accessor: 'assignedCounselorId',
        Cell: ({ cell }: CellProps<object>) => (
          <p>
            {(() => {
              const student = cell.row.original as Student;
              const foundCounselor = counselors.find(
                counselor =>
                  counselor.counselorRef.id ===
                  student.studentRef.assignedCounselorId
              );
              return (
                <>
                  {foundCounselor
                    ? `${foundCounselor.firstName} ${foundCounselor.lastName}`
                    : 'Not Found'}
                </>
              );
            })()}
          </p>
        ),
      },
    ],
    [
      counselors,
      isDeleteStudentAllowed,
      isUpdateStudentAllowed,
      onAppointmentClicked,
      onDeleteClicked,
      onEditClicked,
      schools,
    ]
  );

  const renderRowSubComponent = useCallback((row: Row) => {
    const rowObject = row.original as Student;
    return <StudentDetails student={rowObject} />;
  }, []);

  return (
    <DataTable
      data={students}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

export default StudentsTable;
