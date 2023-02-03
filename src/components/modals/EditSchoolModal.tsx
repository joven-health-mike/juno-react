// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { School } from '../../data/schools';
import CreateSchoolForm from '../forms/CreateSchoolForm';
import { h1Styles } from '../styles/mixins';

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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <Header>Edit School</Header>
      <CreateSchoolForm
        onSubmit={onSchoolEdited}
        onCancel={onClose}
        defaultSchool={initialSchool}
      />
    </Modal>
  );
};

export default EditSchoolModal;
