import React from 'react';
import styled from 'styled-components';
import { Counselor } from '../../data/counselors';
import CreateCounselorForm from '../forms/CreateCounselorForm';
import { h1Styles } from '../styles/mixins';
import Modal from './Modal';

const Header = styled.h1`
  ${h1Styles}
`;

type CreateCounselorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCounselorAdded: (counselor: Counselor) => void;
};

const CreateCounselorModal: React.FC<CreateCounselorModalProps> = ({
  isOpen,
  onClose,
  onCounselorAdded,
}) => {
  const onFormSubmit = (counselor: Counselor) => {
    onCounselorAdded(counselor);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <Header>Create Counselor</Header>
        <CreateCounselorForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateCounselorModal;
