// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { User, UsersContext } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';
import UsersTable from '../tables/UsersTable';

const UsersPage = () => {
  const role = 'admin';

  const {
    data: users,
    add: addUser,
    delete: deleteUser,
  } = useContext(UsersContext);

  const onFormSubmit = (user: User) => {
    addUser(user);
  };

  const onUserDeleteClicked = (userName: string) => {
    if (window.confirm('Delete this user?')) {
      let userToDelete = users.find(user => user.name === userName);
      if (userToDelete) {
        deleteUser(userToDelete);
      }
    }
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Users</h1>
      <>
        <CreateUserForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <UsersTable onDeleteClicked={onUserDeleteClicked} />
      </>
    </div>
  );
};

export default UsersPage;
