// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import { User } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUserEdited: (user: User) => void;
  initialUser: User;
};

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onUserEdited,
  initialUser,
}) => {
  const onFormSubmit = (user: User) => {
    onUserEdited(user);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <h1>Edit User</h1>
      <CreateUserForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultUser={initialUser}
      />
    </Modal>
  );
};

export default EditUserModal;
