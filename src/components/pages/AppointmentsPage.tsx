// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
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
import { CounselorsContext, emptyCounselor } from '../../data/counselors';
import { LoggedInUserContext } from '../../data/users';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';
import EditAppointmentModal from '../modals/EditAppointmentModal';
import Navbar from '../navbar/Navbar';
import AppointmentsTable from '../tables/AppointmentsTable';

const AppointmentsPage: React.FC = () => {
  const {
    add: addAppointment,
    delete: deleteAppointment,
    update: updateAppointment,
  } = useContext(AppointmentsContext);
  const { data: counselors } = useContext(CounselorsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState<boolean>(false);
  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] =
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
    setIsCreateAppointmentModalOpen(false);
  };

  const onEditAppointmentSubmit = (appointment: Appointment) => {
    if (isUpdateAppointmentAllowed) {
      updateAppointment(appointment);
    }
    setIsEditAppointmentModalOpen(false);
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
      setIsEditAppointmentModalOpen(!isEditAppointmentModalOpen);
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
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Appointments</h1>
      <>
        {isCreateAppointmentAllowed && (
          <button
            type="button"
            onClick={() => setIsCreateAppointmentModalOpen(true)}
          >
            Add Appointment
          </button>
        )}
        <AppointmentsTable
          onDeleteClicked={onAppointmentDeleteClicked}
          onEditClicked={onAppointmentEditClicked}
          onEmailClicked={onAppointmentEmailClicked}
          onRoomLinkClicked={onAppointmentRoomLinkClicked}
        />
        {isCreateAppointmentAllowed && (
          <CreateAppointmentModal
            isOpen={isCreateAppointmentModalOpen}
            onClose={() => setIsCreateAppointmentModalOpen(false)}
            onAppointmentAdded={onCreateAppointmentSubmit}
            initialAppointment={emptyAppointment}
          />
        )}
        {isUpdateAppointmentAllowed && (
          <EditAppointmentModal
            isOpen={isEditAppointmentModalOpen}
            onClose={() => setIsEditAppointmentModalOpen(false)}
            onAppointmentAdded={onEditAppointmentSubmit}
            initialAppointment={initialAppointment}
          />
        )}
      </>
    </div>
  );
};

export default AppointmentsPage;
