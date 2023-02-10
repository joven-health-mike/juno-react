import React from 'react';
import styled from 'styled-components';
import { Student } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';
import { h1Styles } from '../styles/mixins';
import Modal from './Modal';

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
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <Header>Create Student</Header>
        <CreateStudentForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateStudentModal;
