// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Column } from 'react-table';
import { School } from '../../data/schools';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type SchoolsSmallTableProps = {
  schools: School[];
};

const SchoolsSmallTable: React.FC<SchoolsSmallTableProps> = ({ schools }) => {
  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    []
  );

  return (
    <DataTable data={schools} defaultColumn={defaultColumn} columns={columns} />
  );
};

export default SchoolsSmallTable;
