// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  createPermission,
  deletePermission,
  updatePermission,
} from '../../auth/permissions';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import { emptyCounselor, getCounselors } from '../../data/counselors';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import AppointmentDialog from '../modals/AppointmentDialog';
import Navbar from '../navbar/Navbar';
import AppointmentsTable from '../tables/AppointmentsTable';
import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

const AppointmentsPage: React.FC = () => {
  const {
    add: addAppointment,
    delete: deleteAppointment,
    update: updateAppointment,
  } = useContext(AppointmentsContext);
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateAppointmentDialogOpen, setIsCreateAppointmentDialogOpen] =
    useState<boolean>(false);
  const [isEditAppointmentDialogOpen, setIsEditAppointmentDialogOpen] =
    useState<boolean>(false);
  const [initialAppointment, setInitialAppointment] =
    useState<Appointment>(emptyAppointment);
  const [isCreateAppointmentAllowed, setIsCreateAppointmentAllowed] =
    useState<boolean>(false);
  const [isDeleteAppointmentAllowed, setIsDeleteAppointmentAllowed] =
    useState<boolean>(false);
  const [isUpdateAppointmentAllowed, setIsUpdateAppointmentAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCreateAppointmentAllowed(
      createPermission(loggedInUser.role, 'appointment')
    );
    setIsDeleteAppointmentAllowed(
      deletePermission(loggedInUser.role, 'appointment')
    );
    setIsUpdateAppointmentAllowed(
      updatePermission(loggedInUser.role, 'appointment')
    );
  }, [loggedInUser.role]);

  const onCreateAppointmentSubmit = (appointment: Appointment) => {
    if (isCreateAppointmentAllowed) {
      addAppointment(appointment);
    }
    setIsCreateAppointmentDialogOpen(false);
  };

  const onEditAppointmentSubmit = (appointment: Appointment) => {
    if (isUpdateAppointmentAllowed) {
      updateAppointment(appointment);
    }
    setIsEditAppointmentDialogOpen(false);
  };

  const onAppointmentDeleteClicked = (appointmentToDelete: Appointment) => {
    if (
      isDeleteAppointmentAllowed &&
      window.confirm('Delete this appointment?')
    ) {
      deleteAppointment(appointmentToDelete);
    }
  };

  const onAppointmentEditClicked = (appointmentToEdit: Appointment) => {
    if (isUpdateAppointmentAllowed) {
      setInitialAppointment(appointmentToEdit);
      setIsEditAppointmentDialogOpen(!isEditAppointmentDialogOpen);
    }
  };

  const onAppointmentEmailClicked = (appointmentToEmail: Appointment) => {
    const appointmentCounselor =
      counselors.find(
        counselor => counselor.id === appointmentToEmail.counselorUserId
      ) || emptyCounselor;
    let mailToUrl = `mailto:${appointmentCounselor.email}`;

    for (const participant of appointmentToEmail.participants) {
      mailToUrl += `,${participant.email}`;
    }

    mailToUrl += `?subject=${encodeURIComponent(appointmentToEmail.title)}`;

    window.open(mailToUrl);
  };

  const onAppointmentRoomLinkClicked = (
    appointmentToOpenRoomLink: Appointment
  ) => {
    const counselor = counselors.find(
      counselor => counselor.id === appointmentToOpenRoomLink.counselorUserId
    );
    if (counselor?.counselorRoomLink) {
      window.open(counselor.counselorRoomLink);
    }
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Typography variant="h3">Appointments</Typography>
      <>
        {isCreateAppointmentAllowed && (
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={() => {
              setIsCreateAppointmentDialogOpen(true);
            }}
          >
            Add Appointment
          </Button>
        )}
        <AppointmentsTable
          onDeleteClicked={onAppointmentDeleteClicked}
          onEditClicked={onAppointmentEditClicked}
          onEmailClicked={onAppointmentEmailClicked}
          onRoomLinkClicked={onAppointmentRoomLinkClicked}
        />
        {isCreateAppointmentAllowed && (
          <AppointmentDialog
            title="Create Appointment"
            isOpen={isCreateAppointmentDialogOpen}
            onClose={() => setIsCreateAppointmentDialogOpen(false)}
            onAppointmentAdded={onCreateAppointmentSubmit}
            initialAppointment={emptyAppointment}
          />
        )}
        {isUpdateAppointmentAllowed && (
          <AppointmentDialog
            title="Update Appointment"
            isOpen={isEditAppointmentDialogOpen}
            onClose={() => setIsEditAppointmentDialogOpen(false)}
            onAppointmentAdded={onEditAppointmentSubmit}
            initialAppointment={initialAppointment}
          />
        )}
      </>
    </>
  );
};

export default AppointmentsPage;
