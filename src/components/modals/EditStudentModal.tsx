// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { Student } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';
import { h1Styles } from '../styles/mixins';
import { BaseModal as Modal } from './BaseModal';

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
  const onFormSubmit = (student: Student) => {
    onStudentEdited(student);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Header>Edit Student</Header>
      <CreateStudentForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultStudent={initialStudent}
      />
    </Modal>
  );
};

export default EditStudentModal;
