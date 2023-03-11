// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { Teacher } from '../../data/teachers';
import CreateStudentForm from '../forms/CreateStudentForm';
import { h1Styles } from '../styles/mixins';
import Modal from './Modal';

const Header = styled.h1`
  ${h1Styles}
`;

type EditTeacherModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTeacherEdited: (teacher: Teacher) => void;
  initialTeacher: Teacher;
};

const EditTeacherModal: React.FC<EditTeacherModalProps> = ({
  isOpen,
  onClose,
  onTeacherEdited,
  initialTeacher,
}) => {
  const onFormSubmit = (teacher: Teacher) => {
    onTeacherEdited(teacher);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Header>Edit Teacher</Header>
      <CreateStudentForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultStudent={initialTeacher}
      />
    </Modal>
  );
};

export default EditTeacherModal;
