// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  position: absolute;
  max-height: 80vh;
  float: left;
  width: 500px;
  max-height: 80vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f6f740;
  border: 2px solid darkslateblue;
  border-radius: 25px;
  padding: 50px 150px;
  box-shadow: 5px 5px 10px 5px #385aa8;
  overflow: auto;
`;

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: JSX.Element | JSX.Element[];
};

const BaseModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={'overlay'}
    >
      {children}
    </StyledModal>
  );
};

export { BaseModal };
