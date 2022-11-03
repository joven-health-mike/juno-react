// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import { School } from '../../data/schools';
import CreateSchoolForm from '../forms/CreateSchoolForm';

type EditSchoolModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSchoolEdited: (school: School) => void;
  initialSchool: School;
};

const EditSchoolModal: React.FC<EditSchoolModalProps> = ({
  isOpen,
  onClose,
  onSchoolEdited,
  initialSchool,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <h1>Edit School</h1>
      <CreateSchoolForm
        onSubmit={onSchoolEdited}
        onCancel={onClose}
        defaultSchool={initialSchool}
      />
    </Modal>
  );
};

export default EditSchoolModal;
