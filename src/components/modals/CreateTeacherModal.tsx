import React from 'react';
import styled from 'styled-components';
import { emptyTeacher, Teacher } from '../../data/teachers';
import CreateStudentForm from '../forms/CreateStudentForm';
import { h1Styles } from '../styles/mixins';
import Modal from './Modal';

const Header = styled.h1`
  ${h1Styles}
`;

type CreateTeacherModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTeacherAdded: (student: Teacher) => void;
};

const CreateTeacherModal: React.FC<CreateTeacherModalProps> = ({
  isOpen,
  onClose,
  onTeacherAdded,
}) => {
  const onFormSubmit = (student: Teacher) => {
    onTeacherAdded(student);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <Header>Create Teacher</Header>
        <CreateStudentForm
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
          defaultStudent={emptyTeacher}
        />
      </Modal>
    </div>
  );
};

export default CreateTeacherModal;
