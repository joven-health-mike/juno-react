// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { Counselor } from '../../data/counselors';
import CreateCounselorForm from '../forms/CreateCounselorForm';
import { h1Styles } from '../styles/mixins';
import { BaseModal as Modal } from './BaseModal';

const Header = styled.h1`
  ${h1Styles}
`;

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
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Header>Edit Counselor</Header>
      <CreateCounselorForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultCounselor={initialCounselor}
      />
    </Modal>
  );
};

export default EditCounselorModal;
