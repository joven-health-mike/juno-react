// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback, useContext, useEffect } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student, StudentsContext } from '../../data/students';
import XButton from '../buttons/XButton';
import StudentDetails from '../details/StudentDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type StudentsTableProps = {
  onDeleteClicked: (appointmentName: string) => void;
};

const StudentsTable: React.FC<StudentsTableProps> = ({ onDeleteClicked }) => {
  const { data: counselors, getAll: getCounselors } =
    useContext(CounselorsContext);
  const { data: schools, getAll: getSchools } = useContext(SchoolsContext);
  const { data: students, getAll: getStudents } = useContext(StudentsContext);

  useEffect(() => {
    getCounselors();
    getSchools();
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        Cell: ({ cell, row }: CellProps<object>) => (
          <>
            <XButton
              value={
                cell.row.values.first_name + ' ' + cell.row.values.last_name
              }
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onDeleteClicked((e.target as HTMLInputElement).value);
              }}
            />
            <button {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? '👇' : '👉'}
            </button>
          </>
        ),
      },
      {
        Header: 'Name',
        accessor: 'id',
        Cell: ({ cell }: CellProps<object>) => (
          <p>
            {(() => {
              const foundStudent = students.find(
                student => student.id === cell.row.values.id
              );
              return (
                <>
                  {foundStudent
                    ? `${foundStudent.firstName} ${foundStudent.lastName}`
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
              const foundSchool = schools.find(
                school =>
                  school.id ===
                  (cell.row.original as Student).studentRef.assignedSchoolId
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
              const foundCounselor = counselors.find(
                counselor =>
                  counselor.counselorRef.id ===
                  (cell.row.original as Student).studentRef.assignedCounselorId
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
    [onDeleteClicked, counselors, schools, students]
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
