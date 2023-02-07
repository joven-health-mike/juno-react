// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { User } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';
import { h1Styles } from '../styles/mixins';
import { BaseModal as Modal } from './BaseModal';

const Header = styled.h1`
  ${h1Styles}
`;

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
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Header>Edit User</Header>
      <CreateUserForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultUser={initialUser}
      />
    </Modal>
  );
};

export default EditUserModal;
