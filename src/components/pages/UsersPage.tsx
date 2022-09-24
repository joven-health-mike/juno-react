// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { User, UsersContext, UsersProvider } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';
import UsersTable from '../tables/UsersTable';

const UsersPage = () => {
  const role = 'admin';

  const { users, getUsers } = useContext(UsersContext);

  const onFormSubmit = (user: User) => {
    // setUsers([...users, user]);
  };

  const onUserDeleteClicked = (userName: string) => {
    if (window.confirm('Delete this user?')) {
      let newUsers = users.filter(user => user.name !== userName);
      // setUsers(newUsers);
    }
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Users</h1>
      <>
        <UsersProvider value={users}>
          <CreateUserForm onSubmit={onFormSubmit} onCancel={() => {}} />
          <UsersTable onDeleteClicked={onUserDeleteClicked} />
        </UsersProvider>
      </>
    </div>
  );
};

export default UsersPage;
