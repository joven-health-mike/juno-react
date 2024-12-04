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
  readonly initialAppointment: Appointment;
  onDeleteClicked: (appointment: Appointment) => void;
  onEmailClicked: (appointment: Appointment) => void;
  onRoomLinkClicked: (appointment: Appointment) => void;
  onAppointmentEdited: (oldAppt: Appointment, newAppt: Appointment) => void;
};

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  isOpen,
  onClose,
  initialAppointment,
  onDeleteClicked,
  onEmailClicked,
  onRoomLinkClicked,
  onAppointmentEdited,
}) => {
  const [childDialogOpen, setChildDialogOpen] = useState(false);
  const [detailsAppointment, setDetailsAppointment] =
    useState(initialAppointment);

  useEffect(() => {
    setDetailsAppointment({ ...initialAppointment });
  }, [initialAppointment]);

  const handleAppointmentEdit = (appointment: Appointment) => {
    setDetailsAppointment(appointment);
    onAppointmentEdited(initialAppointment, appointment);
  };

  return (
    <MaterialDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{initialAppointment.title}</DialogTitle>
      <DialogContent>
        <AppointmentDetails appointment={detailsAppointment} hideTitle={true} />
        <AppointmentDialog
          title={'Edit Appointment'}
          isOpen={childDialogOpen}
          onClose={() => setChildDialogOpen(false)}
          onAppointmentAdded={appointment => handleAppointmentEdit(appointment)}
          initialAppointment={initialAppointment}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onRoomLinkClicked(initialAppointment)}>
          Join
        </Button>
        <Button onClick={() => onEmailClicked(initialAppointment)}>
          Email
        </Button>
        <Button onClick={() => setChildDialogOpen(true)}>Edit</Button>
        <Button onClick={() => onDeleteClicked(initialAppointment)}>
          Delete
        </Button>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default AppointmentDetailsDialog;
