// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent } from 'react';
import { CellProps, Column } from 'react-table';
import { User } from '../../data/users';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type UsersTableProps = {
  users: User[];
  onDeleteClicked: (userName: string) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({ users, onDeleteClicked }) => {
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
      {
        Header: 'Password',
        accessor: 'password',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
    ],
    [onDeleteClicked]
  );

  return (
    <DataTable data={users} defaultColumn={defaultColumn} columns={columns} />
  );
};

export default UsersTable;
