import React from 'react';
import Modal from 'react-modal';
import { School } from '../../data/schools';
import CreateSchoolForm from '../forms/CreateSchoolForm';

type CreateSchoolModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSchoolAdded: (school: School) => void;
};

const CreateSchoolModal: React.FC<CreateSchoolModalProps> = ({
  isOpen,
  onClose,
  onSchoolAdded,
}) => {
  const onFormSubmit = (school: School) => {
    onSchoolAdded(school);
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
        <h1>Create School</h1>
        <CreateSchoolForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateSchoolModal;
