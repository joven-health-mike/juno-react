// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Counselor } from '../../data/counselors';
import CreateCounselorForm from '../forms/CreateCounselorForm';
import { h1Styles } from '../styles/mixins';

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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <Header>Edit Counselor</Header>
      <CreateCounselorForm
        onSubmit={onCounselorEdited}
        onCancel={onClose}
        defaultCounselor={initialCounselor}
      />
    </Modal>
  );
};

export default EditCounselorModal;
