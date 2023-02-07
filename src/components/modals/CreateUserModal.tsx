import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { User } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';
import { h1Styles } from '../styles/mixins';

const Header = styled.h1`
  ${h1Styles}
`;

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (user: User) => void;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onUserAdded,
}) => {
  const onFormSubmit = (user: User) => {
    onUserAdded(user);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={'modal'}
        overlayClassName={'overlay'}
      >
        <Header>Create User</Header>
        <CreateUserForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateUserModal;
