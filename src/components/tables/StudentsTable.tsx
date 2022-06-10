// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent } from 'react';
import { Student } from '../../data/students';
import XButton from '../buttons/XButton';
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
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        Cell: ({ cell }: any) => (
          <XButton
            value={cell.row.values.first_name + ' ' + cell.row.values.last_name}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onDeleteClicked((e.target as HTMLInputElement).value);
            }}
          />
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

  return (
    <DataTable
      data={students}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  );
};

export default StudentsTable;
