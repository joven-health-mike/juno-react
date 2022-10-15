// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { User, UsersContext } from '../../data/users';
import CreateUserModal from '../modals/CreateUserModal';
import Navbar from '../navbar/Navbar';
import UsersTable from '../tables/UsersTable';

const UsersPage = () => {
  const {
    add: addUser,
    delete: deleteUser,
    update: updateUser,
  } = useContext(UsersContext);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    useState<boolean>(false);

  const onFormSubmit = (user: User) => {
    addUser(user);
  };

  const onUserDeleteClicked = (userToDelete: User) => {
    if (window.confirm('Delete this user?')) {
      deleteUser(userToDelete);
    }
  };

  const onUserEditClicked = (userToEdit: User) => {
    updateUser(userToEdit);
  };

  const onUserEmailClicked = (userToEdit: User) => {
    window.location.href = `mailto:${userToEdit.email}`;
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
        <UsersTable
          onDeleteClicked={onUserDeleteClicked}
          onEditClicked={onUserEditClicked}
          onEmailClicked={onUserEmailClicked}
        />
      </>
    </div>
  );
};

export default UsersPage;
