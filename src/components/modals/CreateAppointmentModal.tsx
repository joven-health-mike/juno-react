// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Appointment } from '../../data/appointments';
import CreateAppointmentForm from '../forms/CreateAppointmentForm';
import { h1Styles } from '../styles/mixins';

const Header = styled.h1`
  ${h1Styles}
`;

type CreateAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentAdded: (appointment: Appointment) => void;
  initialAppointment: Appointment;
};

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  isOpen,
  onClose,
  onAppointmentAdded,
  initialAppointment,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <Header>Create Appointment</Header>
      <CreateAppointmentForm
        onSubmit={onAppointmentAdded}
        onCancel={onClose}
        defaultAppointment={initialAppointment}
      />
    </Modal>
  );
};

export default CreateAppointmentModal;
