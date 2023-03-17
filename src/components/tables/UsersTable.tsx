// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import { deletePermission, updatePermission } from '../../auth/permissions';
import { LoggedInUserContext, User, UsersContext } from '../../data/users';
import UserDetails from '../details/UserDetails';
import MaterialTable from './MaterialTable';

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

  const createTableData = (students: TableUser[]) => {
    const tableData: string[][] = [];

    students.forEach(student => {
      tableData.push([student.id, student.name, student.role]);
    });

    return tableData;
  };

  const onDeleteRow = isDeleteUserAllowed
    ? (id: string) => {
        const user = users.find(user => user.id === id);
        onDeleteClicked(user!);
      }
    : undefined;

  const onEditRow = isUpdateUserAllowed
    ? (id: string) => {
        const user = users.find(user => user.id === id);
        onEditClicked(user!);
      }
    : undefined;

  const onEmailRow = (id: string) => {
    const user = users.find(user => user.id === id);
    onEmailClicked(user!);
  };

  const getExpandComponent = (id: string) => {
    const user = users.find(user => user.id === id);
    if (typeof user === 'undefined') return <></>;
    return <UserDetails user={user!} />;
  };

  return (
    <MaterialTable
      rows={createTableData(tableUsers)}
      columnHeaders={['id', 'Name', 'Role']}
      hideColumnIndexes={[0]}
      tableButtonInfo={{
        onDeleteRow,
        onEditRow,
        onEmailRow,
      }}
      getExpandComponent={getExpandComponent}
    />
  );
};

export default UsersTable;
