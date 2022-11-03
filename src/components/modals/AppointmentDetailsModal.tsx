// Copyright 2022 Social Fabric, LLC

import React from 'react';
import Modal from 'react-modal';
import { Appointment } from '../../data/appointments';
import AppointmentDetails from '../details/AppointmentDetails';

type AppointmentDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onDeleteClicked: (appointment: Appointment) => void;
  onEmailClicked: (appointment: Appointment) => void;
  onRoomLinkClicked: (appointment: Appointment) => void;
};

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onDeleteClicked,
  onEmailClicked,
  onRoomLinkClicked,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'modal'}
      overlayClassName={'overlay'}
    >
      <h1>Appointment Details</h1>
      <AppointmentDetails
        appointment={appointment}
        onCancelAppointmentClicked={onDeleteClicked}
        onJoinAppointmentClicked={onRoomLinkClicked}
        onEmailParticipantsClicked={onEmailClicked}
      />
    </Modal>
  );
};

export default AppointmentDetailsModal;
