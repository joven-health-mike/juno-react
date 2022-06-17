// Copyright 2022 Social Fabric, LLC

import React, { MouseEvent, useCallback } from 'react';
import { CellProps, Column, Row } from 'react-table';
import { User } from '../../data/users';
import XButton from '../buttons/XButton';
import UserDetails from '../details/UserDetails';
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
        id: 'expander',
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
        ),
        Cell: ({ cell, row }: CellProps<object>) => (
          <>
            <XButton
              value={cell.row.values.name}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onDeleteClicked((e.target as HTMLInputElement).value);
              }}
            />
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? '👇' : '👉'}
            </span>
          </>
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

  const renderRowSubComponent = useCallback((row: Row) => {
    const rowObject = row.original as User;
    return <UserDetails user={rowObject} />;
  }, []);

  return (
    <DataTable
      data={users}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

export default UsersTable;
