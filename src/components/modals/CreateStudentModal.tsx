import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Student } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';
import { h1Styles } from '../styles/mixins';

const Header = styled.h1`
  ${h1Styles}
`;

type CreateStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStudentAdded: (student: Student) => void;
};

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  isOpen,
  onClose,
  onStudentAdded,
}) => {
  const onFormSubmit = (student: Student) => {
    onStudentAdded(student);
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
        <Header>Create Student</Header>
        <CreateStudentForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateStudentModal;
