// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import { Counselor } from '../../data/counselors';
import CreateCounselorForm from '../forms/CreateCounselorForm';

type EditCounselorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCounselorEdited: (counselor: Counselor) => void;
  initialCounselor: Counselor;
};

const EditCounselorModal: React.FC<EditCounselorModalProps> = ({
  isOpen,
  onClose,
  onCounselorEdited,
  initialCounselor,
}) => {
  const onFormSubmit = (counselor: Counselor) => {
    onCounselorEdited(counselor);
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
      <h1>Edit Counselor</h1>
      <CreateCounselorForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultCounselor={initialCounselor}
      />
    </Modal>
  );
};

export default EditCounselorModal;
