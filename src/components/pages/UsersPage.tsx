// Copyright 2022 Social Fabric, LLC

import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
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
import UserDialog from '../modals/UserDialog';
import Navbar from '../navbar/Navbar';
import UsersTable from '../tables/UsersTable';

const UsersPage = () => {
  const {
    add: addUser,
    delete: deleteUser,
    update: updateUser,
  } = useContext(UsersContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] =
    useState<boolean>(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] =
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
      setIsEditUserDialogOpen(true);
    }
  };

  const onUserEmailClicked = (userToEmail: User) => {
    window.open(`mailto:${userToEmail.email}`);
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Typography variant="h3">Users</Typography>
      <>
        {isCreateUserAllowed && (
          <>
            <Box sx={{ mb: 2, mt: 2 }} justifyContent="center" display="flex">
              <Button
                variant="contained"
                endIcon={<Add />}
                onClick={() => {
                  setIsCreateUserDialogOpen(true);
                }}
              >
                Add User
              </Button>
            </Box>
            <UserDialog
              isOpen={isCreateUserDialogOpen}
              onUserAdded={handleUserAdded}
              onClose={() => setIsCreateUserDialogOpen(false)}
              initialUser={emptyUser}
              title={'Create User'}
            />
          </>
        )}
        {isUpdateUserAllowed && (
          <UserDialog
            isOpen={isEditUserDialogOpen}
            onUserAdded={handleUserEdited}
            onClose={() => setIsEditUserDialogOpen(false)}
            initialUser={modalUser}
            title={'Edit User'}
          />
        )}
        <UsersTable
          onDeleteClicked={onUserDeleteClicked}
          onEditClicked={onUserEditClicked}
          onEmailClicked={onUserEmailClicked}
        />
      </>
    </>
  );
};

export default UsersPage;
