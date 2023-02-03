// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { buttonStyles } from '../styles/mixins';
import {
  createPermission,
  deletePermission,
  updatePermission,
} from '../../auth/permissions';
import {
  emptyUser,
  LoggedInUserContext,
  User,
  UsersContext,
} from '../../data/users';
import CreateUserModal from '../modals/CreateUserModal';
import EditUserModal from '../modals/EditUserModal';
import Navbar from '../navbar/Navbar';
import UsersTable from '../tables/UsersTable';

const Button = styled.button`
  ${buttonStyles}
`;

const UsersPage = () => {
  const {
    add: addUser,
    delete: deleteUser,
    update: updateUser,
  } = useContext(UsersContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);
  const [modalUser, setModalUser] = useState<User>(emptyUser);
  const [isCreateUserAllowed, setIsCreateUserAllowed] =
    useState<boolean>(false);
  const [isDeleteUserAllowed, setIsDeleteUserAllowed] =
    useState<boolean>(false);
  const [isUpdateUserAllowed, setIsUpdateUserAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCreateUserAllowed(createPermission(loggedInUser.role, 'user'));
    setIsDeleteUserAllowed(deletePermission(loggedInUser.role, 'user'));
    setIsUpdateUserAllowed(updatePermission(loggedInUser.role, 'user'));
  }, [loggedInUser.role]);

  const handleUserAdded = (user: User) => {
    if (isCreateUserAllowed) {
      addUser(user);
    }
  };

  const handleUserEdited = (user: User) => {
    if (isUpdateUserAllowed) {
      updateUser(user);
    }
  };

  const onUserDeleteClicked = (userToDelete: User) => {
    if (isDeleteUserAllowed && window.confirm('Delete this user?')) {
      deleteUser(userToDelete);
    }
  };

  const onUserEditClicked = (userToEdit: User) => {
    if (isUpdateUserAllowed) {
      setModalUser(userToEdit);
      setIsEditUserModalOpen(true);
    }
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
        {isCreateUserAllowed && (
          <>
            <Button
              type="button"
              onClick={() => setIsCreateUserModalOpen(true)}
            >
              Add User
            </Button>
            <CreateUserModal
              isOpen={isCreateUserModalOpen}
              onUserAdded={handleUserAdded}
              onClose={() => setIsCreateUserModalOpen(false)}
            />
          </>
        )}
        {isUpdateUserAllowed && (
          <EditUserModal
            isOpen={isEditUserModalOpen}
            onUserEdited={handleUserEdited}
            onClose={() => setIsEditUserModalOpen(false)}
            initialUser={modalUser}
          />
        )}
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
