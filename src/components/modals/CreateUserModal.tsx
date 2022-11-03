import React from 'react';
import Modal from 'react-modal';
import { User } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';

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
        <h1>Create User</h1>
        <CreateUserForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateUserModal;
