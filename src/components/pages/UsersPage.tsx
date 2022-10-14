// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState, useEffect } from 'react';
import { User, UsersContext } from '../../data/users';
import Navbar from '../navbar/Navbar';
import UsersTable from '../tables/UsersTable';

const UsersPage = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    useState<boolean>(false);
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
      let userToDelete = users.find(
        user => user.firstName + ' ' + user.lastName === userName
      );
      if (userToDelete) {
        deleteUser(userToDelete);
      }
    }
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Users</h1>
      <>
        <button onClick={() => setIsCreateUserModalOpen(true)}>Add User</button>
        <UsersTable onDeleteClicked={onUserDeleteClicked} />
      </>
    </div>
  );
};

export default UsersPage;
