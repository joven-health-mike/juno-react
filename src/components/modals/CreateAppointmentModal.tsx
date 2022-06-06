import React from 'react';
import Modal from 'react-modal';
import { Appointment } from '../../data/appointments';
import CreateAppointmentForm from '../forms/CreateAppointmentForm';

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
      <h1>Create Appointment</h1>
      <CreateAppointmentForm
        onSubmit={onAppointmentAdded}
        onCancel={onClose}
        defaultAppointment={initialAppointment}
      />
    </Modal>
  );
};

export default CreateAppointmentModal;
