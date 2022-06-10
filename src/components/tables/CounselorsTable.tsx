// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent } from 'react';
import { Column } from 'react-table';
import { Counselor } from '../../data/counselors';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type CounselorsTableProps = {
  counselors: Counselor[];
  onDeleteClicked: (counselorName: string) => void;
};

const CounselorsTable: React.FC<CounselorsTableProps> = ({
  counselors,
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
        Cell: ({ cell }: any) => (
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
      {
        Header: 'Room Link',
        accessor: 'roomLink',
      },
    ],
    [onDeleteClicked]
  );

  return (
    <DataTable
      data={counselors}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  );
};

export default CounselorsTable;
