// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { User, UsersContext } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';
import Navbar from '../navbar/Navbar';
import UsersTable from '../tables/UsersTable';

const UsersPage = () => {
  const { add: addUser, delete: deleteUser } = useContext(UsersContext);

  const onFormSubmit = (user: User) => {
    addUser(user);
  };

  const onUserDeleteClicked = (userToDelete: User) => {
    if (window.confirm('Delete this user?')) {
      deleteUser(userToDelete);
    }
  };

  const onUserEditClicked = (userToEdit: User) => {
    // TODO: Add ability to edit
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
        <CreateUserForm onSubmit={onFormSubmit} onCancel={() => {}} />
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
