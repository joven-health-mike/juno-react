// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { User } from '../../data/users';
import XButton from '../buttons/XButton';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type UsersTableProps = {
  users: User[];
  onDeleteClicked: (userName: string) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({ users, onDeleteClicked }) => {
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
      {
        Header: 'Associated Account',
        accessor: 'associatedAccount',
      },
    ],
    [onDeleteClicked]
  );

  return (
    <DataTable data={users} defaultColumn={defaultColumn} columns={columns} />
  );
};

export default UsersTable;
