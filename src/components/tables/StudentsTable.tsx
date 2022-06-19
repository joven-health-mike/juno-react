// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback, useContext } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student } from '../../data/students';
import XButton from '../buttons/XButton';
import StudentDetails from '../details/StudentDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type StudentsTableProps = {
  students: Student[];
  onDeleteClicked: (appointmentName: string) => void;
};

const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  onDeleteClicked,
}) => {
  const { counselors } = useContext(CounselorsContext);
  const { schools } = useContext(SchoolsContext);

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
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'School',
        accessor: 'schoolId',
        Cell: ({ cell }: CellProps<object>) => (
          <p>
            {(() => {
              const foundSchool = schools.filter(
                school => school._id === cell.row.values.schoolId
              )[0];
              return <>{foundSchool.name}</>;
            })()}
          </p>
        ),
      },
      {
        Header: 'Counselor',
        accessor: 'counselorId',
        Cell: ({ cell }: CellProps<object>) => (
          <p>
            {(() => {
              const foundCounselor = counselors.filter(
                counselor => counselor._id === cell.row.values.counselorId
              )[0];
              return <>{foundCounselor.name}</>;
            })()}
          </p>
        ),
      },
    ],
    [onDeleteClicked, counselors, schools]
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
      hiddenColumns={['_id']}
    />
  );
};

export default StudentsTable;
