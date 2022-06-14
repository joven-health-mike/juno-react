// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent } from 'react';
import { CellProps, Column } from 'react-table';
import { School } from '../../data/schools';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type SchoolsTableProps = {
  schools: School[];
  onDeleteClicked: (schoolName: string) => void;
};

const SchoolsTable: React.FC<SchoolsTableProps> = ({
  schools,
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
        Header: ' ',
        Cell: ({ cell }: CellProps<object>) => (
          <XButton
            value={cell.row.values.name}
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
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    [onDeleteClicked]
  );

  return (
    <DataTable data={schools} defaultColumn={defaultColumn} columns={columns} />
  );
};

export default SchoolsTable;
