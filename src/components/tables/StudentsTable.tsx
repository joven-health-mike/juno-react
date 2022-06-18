// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback } from 'react';
import { CellProps, Column, Row } from 'react-table';
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
        Header: 'School ID',
        accessor: 'schoolId',
      },
      {
        Header: 'Counselor ID',
        accessor: 'counselorId',
      },
    ],
    [onDeleteClicked]
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
