import React from 'react';
import Modal from 'react-modal';
import { Student } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';

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
        <h1>Create Counselor</h1>
        <CreateStudentForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateStudentModal;
