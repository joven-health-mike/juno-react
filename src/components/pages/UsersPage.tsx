// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { User, UsersContext } from '../../data/users';
import CreateUserModal from '../modals/CreateUserModal';
import Navbar from '../navbar/Navbar';
import UsersTable from '../tables/UsersTable';

const UsersPage = () => {
  const {
    data: users,
    add: addUser,
    delete: deleteUser,
  } = useContext(UsersContext);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    useState<boolean>(false);

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
        <button type="button" onClick={() => setIsCreateUserModalOpen(true)}>
          Add User
        </button>
        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onUserAdded={onFormSubmit}
          onClose={() => setIsCreateUserModalOpen(false)}
        />
        <UsersTable onDeleteClicked={onUserDeleteClicked} />
      </>
    </div>
  );
};

export default UsersPage;
