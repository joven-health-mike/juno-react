// Copyright 2022 Social Fabric, LLC

import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CellProps, Column, Row } from 'react-table';
import styled from 'styled-components';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { LoggedInUserContext, User, UsersContext } from '../../data/users';
import XButton from '../buttons/XButton';
import UserDetails from '../details/UserDetails';
import { buttonStyles } from '../styles/mixins';
import DataTable from './DataTable';
import TableSearchFilter from './TableSearchFilter';

const Button = styled.button`
  ${buttonStyles}
`;

type UsersTableProps = {
  onDeleteClicked: (user: User) => void;
  onEditClicked: (user: User) => void;
  onEmailClicked: (user: User) => void;
};

export type TableUser = {
  id: string;
  name: string;
  role: string;
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
  const [tableUsers, setTableUsers] = useState<TableUser[]>([]);

  useEffect(() => {
    setIsDeleteUserAllowed(deletePermission(loggedInUser.role, 'user'));
    setIsUpdateUserAllowed(updatePermission(loggedInUser.role, 'user'));
  }, [loggedInUser.role]);

  useEffect(() => {
    const mappedUsers = users.map(user => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
      } as TableUser;
    });

    setTableUsers(mappedUsers);
  }, [users]);

  const getUserFromTableUser = useCallback(
    (tableUser: TableUser): User => {
      return users.find(user => user.id === tableUser.id) as User;
    },
    [users]
  );

  const getButtonCell = useCallback(
    (tableUser: TableUser, row: Row) => {
      const user = getUserFromTableUser(tableUser);
      if (!user) return <></>;

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
          <Button {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </Button>
        </>
      );
    },
    [
      getUserFromTableUser,
      isDeleteUserAllowed,
      isUpdateUserAllowed,
      onDeleteClicked,
      onEditClicked,
      onEmailClicked,
    ]
  );

  const defaultColumn: Record<string, unknown> = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  );

  const columns: Column[] = React.useMemo(
    () => [
      {
        id: 'buttons',
        Cell: ({ cell, row }: CellProps<object>) => {
          const user = cell.row.original as TableUser;
          return getButtonCell(user, row);
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
    ],
    [getButtonCell]
  );

  const renderRowSubComponent = useCallback(
    (row: Row) => {
      const rowObject = row.original as TableUser;
      const user = getUserFromTableUser(rowObject);
      if (typeof user === 'undefined') return <></>;
      return <UserDetails user={user} />;
    },
    [getUserFromTableUser]
  );

  return (
    <DataTable
      data={tableUsers}
      defaultColumn={defaultColumn}
      columns={columns}
      renderRowSubComponent={renderRowSubComponent}
      hiddenColumns={['id']}
    />
  );
};

export default UsersTable;
