// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { emptyUser, User, UsersContext } from '../../data/users';
import CreateUserModal from '../modals/CreateUserModal';
import EditUserModal from '../modals/EditUserModal';
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
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);
  const [modalUser, setModalUser] = useState<User>(emptyUser);

  const handleUserAdded = (user: User) => {
    addUser(user);
  };

  const handleUserEdited = (user: User) => {
    updateUser(user);
  };

  const onUserDeleteClicked = (userToDelete: User) => {
    if (window.confirm('Delete this user?')) {
      deleteUser(userToDelete);
    }
  };

  const onUserEditClicked = (userToEdit: User) => {
    setModalUser(userToEdit);
    setIsEditUserModalOpen(true);
  };

  const onUserEmailClicked = (userToEmail: User) => {
    window.open(`mailto:${userToEmail.email}`);
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
          onUserAdded={handleUserAdded}
          onClose={() => setIsCreateUserModalOpen(false)}
        />
        <EditUserModal
          isOpen={isEditUserModalOpen}
          onUserEdited={handleUserEdited}
          onClose={() => setIsEditUserModalOpen(false)}
          initialUser={modalUser}
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
