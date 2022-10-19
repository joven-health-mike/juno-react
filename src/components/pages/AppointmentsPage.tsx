// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import { CounselorsContext, emptyCounselor } from '../../data/counselors';
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

  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState<boolean>(false);
  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] =
    useState<boolean>(false);
  const [initialAppointment, setInitialAppointment] =
    useState<Appointment>(emptyAppointment);

  const onCreateAppointmentSubmit = (appointment: Appointment) => {
    addAppointment(appointment);
    setIsCreateAppointmentModalOpen(false);
  };

  const onEditAppointmentSubmit = (appointment: Appointment) => {
    updateAppointment(appointment);
    setIsEditAppointmentModalOpen(false);
  };

  const onAppointmentDeleteClicked = (appointmentToDelete: Appointment) => {
    if (window.confirm('Delete this appointment?')) {
      deleteAppointment(appointmentToDelete);
    }
  };

  const onAppointmentEditClicked = (appointmentToEdit: Appointment) => {
    setInitialAppointment(appointmentToEdit);
    setIsEditAppointmentModalOpen(!isEditAppointmentModalOpen);
  };

  const onAppointmentEmailClicked = (appointmentToEmail: Appointment) => {
    const appointmentCounselor =
      counselors.find(
        counselor =>
          counselor.counselorRef.id === appointmentToEmail.counselorId
      ) || emptyCounselor;
    let mailToUrl = `mailto:${appointmentCounselor.email}`;

    for (const participant of appointmentToEmail.participants) {
      mailToUrl += `,${participant.email}`;
    }

    mailToUrl += `?subject=${encodeURIComponent(appointmentToEmail.title)}`;

    window.open(mailToUrl);
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Appointments</h1>
      <>
        <button
          type="button"
          onClick={() => setIsCreateAppointmentModalOpen(true)}
        >
          Add Appointment
        </button>
        <AppointmentsTable
          onDeleteClicked={onAppointmentDeleteClicked}
          onEditClicked={onAppointmentEditClicked}
          onEmailClicked={onAppointmentEmailClicked}
        />
        <CreateAppointmentModal
          isOpen={isCreateAppointmentModalOpen}
          onClose={() => setIsCreateAppointmentModalOpen(false)}
          onAppointmentAdded={onCreateAppointmentSubmit}
          initialAppointment={emptyAppointment}
        />
        <EditAppointmentModal
          isOpen={isEditAppointmentModalOpen}
          onClose={() => setIsEditAppointmentModalOpen(false)}
          onAppointmentAdded={onEditAppointmentSubmit}
          initialAppointment={initialAppointment}
        />
      </>
    </div>
  );
};

export default AppointmentsPage;
