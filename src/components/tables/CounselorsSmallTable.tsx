// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Column } from 'react-table';
import { Counselor } from '../../data/counselors';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type CounselorsSmallTableProps = {
  counselors: Counselor[];
};

const CounselorsSmallTable: React.FC<CounselorsSmallTableProps> = ({
  counselors,
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
    <DataTable
      data={counselors}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  );
};

export default CounselorsSmallTable;
