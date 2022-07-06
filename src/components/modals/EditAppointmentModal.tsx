// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import { Appointment } from '../../data/appointments';
import CreateAppointmentForm from '../forms/CreateAppointmentForm';

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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <h1>Edit Appointment</h1>
      <CreateAppointmentForm
        onSubmit={onAppointmentAdded}
        onCancel={onClose}
        defaultAppointment={initialAppointment}
      />
    </Modal>
  );
};

export default EditAppointmentModal;
