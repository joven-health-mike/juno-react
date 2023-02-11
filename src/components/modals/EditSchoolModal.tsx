// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { School } from '../../data/schools';
import CreateSchoolForm from '../forms/CreateSchoolForm';
import { h1Styles } from '../styles/mixins';
import Modal from './Modal';

const Header = styled.h1`
  ${h1Styles}
`;

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
  const onFormSubmit = (school: School) => {
    onSchoolEdited(school);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Header>Edit School</Header>
      <CreateSchoolForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultSchool={initialSchool}
      />
    </Modal>
  );
};

export default EditSchoolModal;
