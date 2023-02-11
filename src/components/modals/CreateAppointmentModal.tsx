// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { Appointment } from '../../data/appointments';
import CreateAppointmentForm from '../forms/CreateAppointmentForm';
import { h1Styles } from '../styles/mixins';
import Modal from './Modal';

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
  const onFormSubmit = (appointment: Appointment) => {
    onAppointmentAdded(appointment);
    onClose();
  };
  const onFormCancel = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Header>Create Appointment</Header>
      <CreateAppointmentForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultAppointment={initialAppointment}
      />
    </Modal>
  );
};

export default CreateAppointmentModal;
