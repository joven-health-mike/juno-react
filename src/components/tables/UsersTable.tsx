// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { LoggedInUserContext, User, UsersContext } from '../../data/users';
import XButton from '../buttons/XButton';
import UserDetails from '../details/UserDetails';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

type UsersTableProps = {
  onDeleteClicked: (user: User) => void;
  onEditClicked: (user: User) => void;
  onEmailClicked: (user: User) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({
  onDeleteClicked,
  onEditClicked,
  onEmailClicked,
}) => {
  const { data: users } = useContext(UsersContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isDeleteUserAllowed, setIsDeleteUserAllowed] =
    useState<boolean>(false);
  const [isUpdateUserAllowed, setIsUpdateUserAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsDeleteUserAllowed(deletePermission(loggedInUser.role, 'user'));
    setIsUpdateUserAllowed(updatePermission(loggedInUser.role, 'user'));
  }, [loggedInUser.role]);

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
          <button {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </button>
        ),
        Cell: ({ cell, row }: CellProps<object>) => {
          const user = cell.row.original as User;

          return (
            <>
              {isDeleteUserAllowed && (
                <XButton
                  text="❌"
                  title={`Delete ${user.firstName}`}
                  value={user.id}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onDeleteClicked(user);
                  }}
                />
              )}
              {isUpdateUserAllowed && (
                <XButton
                  text="✏️"
                  title={`Edit ${user.firstName}`}
                  value={user.id}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onEditClicked(user);
                  }}
                />
              )}
              <XButton
                text="📧"
                title={`Email ${user.firstName}`}
                value={user.id}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onEmailClicked(user);
                }}
              />
              <button {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '👇' : '👉'}
              </button>
            </>
          );
        },
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
    ],
    [
      isDeleteUserAllowed,
      isUpdateUserAllowed,
      onDeleteClicked,
      onEditClicked,
      onEmailClicked,
    ]
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
      hiddenColumns={['id']}
    />
  );
};

export default UsersTable;
