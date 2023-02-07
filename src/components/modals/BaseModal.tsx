// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      {children}
    </Modal>
  );
};

export { BaseModal };
