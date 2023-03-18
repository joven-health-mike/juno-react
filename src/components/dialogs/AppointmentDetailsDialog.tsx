// Copyright 2022 Social Fabric, LLC

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Appointment } from '../../data/appointments';
import AppointmentDetails from '../details/AppointmentDetails';
import AppointmentDialog from './AppointmentDialog';
import MaterialDialog from './MaterialDialog';

type AppointmentDetailsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  readonly appointment: Appointment;
  onDeleteClicked: (appointment: Appointment) => void;
  onEmailClicked: (appointment: Appointment) => void;
  onRoomLinkClicked: (appointment: Appointment) => void;
  onAppointmentEdited: (appointment: Appointment) => void;
};

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  isOpen,
  onClose,
  appointment,
  onDeleteClicked,
  onEmailClicked,
  onRoomLinkClicked,
  onAppointmentEdited,
}) => {
  const [childDialogOpen, setChildDialogOpen] = useState(false);
  const [detailsAppointment, setDetailsAppointment] = useState(appointment);

  useEffect(() => {
    setDetailsAppointment({ ...appointment });
  }, [appointment]);

  const handleAppointmentEdit = (appointment: Appointment) => {
    setDetailsAppointment(appointment);
    onAppointmentEdited(appointment);
  };

  return (
    <MaterialDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{appointment.title}</DialogTitle>
      <DialogContent>
        <AppointmentDetails appointment={detailsAppointment} hideTitle={true} />
        <AppointmentDialog
          title={'Edit Appointment'}
          isOpen={childDialogOpen}
          onClose={() => setChildDialogOpen(false)}
          onAppointmentAdded={appointment => handleAppointmentEdit(appointment)}
          initialAppointment={appointment}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onRoomLinkClicked(appointment)}>Join</Button>
        <Button onClick={() => onEmailClicked(appointment)}>Email</Button>
        <Button onClick={() => setChildDialogOpen(true)}>Edit</Button>
        <Button onClick={() => onDeleteClicked(appointment)}>Delete</Button>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default AppointmentDetailsDialog;
