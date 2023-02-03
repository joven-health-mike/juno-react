// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Student } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';
import { h1Styles } from '../styles/mixins';

const Header = styled.h1`
  ${h1Styles}
`;

type EditStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStudentEdited: (student: Student) => void;
  initialStudent: Student;
};

const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  onClose,
  onStudentEdited,
  initialStudent,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <Header>Edit Student</Header>
      <CreateStudentForm
        onSubmit={onStudentEdited}
        onCancel={onClose}
        defaultStudent={initialStudent}
      />
    </Modal>
  );
};

export default EditStudentModal;
