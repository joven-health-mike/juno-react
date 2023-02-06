// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import { Student } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <h1>Edit Student</h1>
      <CreateStudentForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultStudent={initialStudent}
      />
    </Modal>
  );
};

export default EditStudentModal;
