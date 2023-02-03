// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { User } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';
import { h1Styles } from '../styles/mixins';

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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <Header>Edit User</Header>
      <CreateUserForm
        onSubmit={onUserEdited}
        onCancel={onClose}
        defaultUser={initialUser}
      />
    </Modal>
  );
};

export default EditUserModal;
