// Copyright 2022 Social Fabric, LLC

import React from 'react';
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
            value={cell.row.values.name}
            onClick={(e: any) => {
              e.preventDefault();
              onDeleteClicked(e.target.value);
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
