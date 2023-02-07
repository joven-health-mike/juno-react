import React from 'react';
import styled from 'styled-components';
import { School } from '../../data/schools';
import CreateSchoolForm from '../forms/CreateSchoolForm';
import { h1Styles } from '../styles/mixins';
import { BaseModal as Modal } from './BaseModal';

const Header = styled.h1`
  ${h1Styles}
`;

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
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <Header>Create School</Header>
        <CreateSchoolForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </Modal>
    </div>
  );
};

export default CreateSchoolModal;
