// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Column } from 'react-table';
import { Student } from '../../data/students';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type StudentsSmallTableProps = {
  students: Student[];
};

const StudentsSmallTable: React.FC<StudentsSmallTableProps> = ({
  students,
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
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
    ],
    []
  );

  return (
    <DataTable
      data={students}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  );
};

export default StudentsSmallTable;
