// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { Appointment } from '../../data/appointments';
import CreateAppointmentForm from '../forms/CreateAppointmentForm';
import { h1Styles } from '../styles/mixins';
import { BaseModal as Modal } from './BaseModal';

const Header = styled.h1`
  ${h1Styles}
`;

type EditAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentAdded: (appointment: Appointment) => void;
  initialAppointment: Appointment;
};

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
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
      <Header>Edit Appointment</Header>
      <CreateAppointmentForm
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
        defaultAppointment={initialAppointment}
      />
    </Modal>
  );
};

export default EditAppointmentModal;
