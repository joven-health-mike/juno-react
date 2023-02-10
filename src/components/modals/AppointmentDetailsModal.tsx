// Copyright 2022 Social Fabric, LLC

import React from 'react';
import styled from 'styled-components';
import { Appointment } from '../../data/appointments';
import AppointmentDetails from '../details/AppointmentDetails';
import { h1Styles } from '../styles/mixins';
import Modal from './Modal';

const Header = styled.h1`
  ${h1Styles}
`;

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
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Header>Appointment Details</Header>
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
