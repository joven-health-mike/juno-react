// Copyright 2022 Social Fabric, LLC

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import React from 'react';
import { Appointment } from '../../data/appointments';
import AppointmentDetails from '../details/AppointmentDetails';
import MaterialDialog from './MaterialDialog';

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
    <MaterialDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{appointment.title}</DialogTitle>
      <DialogContent>
        <AppointmentDetails appointment={appointment} hideTitle={true} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onRoomLinkClicked(appointment)}>Join</Button>
        <Button onClick={() => onEmailClicked(appointment)}>Email</Button>
        <Button onClick={() => onDeleteClicked(appointment)}>Delete</Button>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default AppointmentDetailsModal;
