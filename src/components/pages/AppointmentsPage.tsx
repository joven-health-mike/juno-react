// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import CreateAppointmentForm from '../forms/CreateAppointmentForm';
import EditAppointmentModal from '../modals/EditAppointmentModal';
import Navbar from '../navbar/Navbar';
import AppointmentsTable from '../tables/AppointmentsTable';

const AppointmentsPage: React.FC = () => {
  const {
    data: appointments,
    add: addAppointment,
    delete: deleteAppointment,
  } = useContext(AppointmentsContext);

  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState<boolean>(false);
  const [initialAppointment, setInitialAppointment] =
    useState<Appointment>(emptyAppointment);

  const onFormSubmit = (appointment: Appointment) => {
    addAppointment(appointment);
  };

  const onAppointmentDeleteClicked = (appointmentTitle: string) => {
    if (window.confirm('Delete this appointment?')) {
      let deletingAppointment = appointments.find(
        appointment => appointment.title === appointmentTitle
      );
      if (deletingAppointment) {
        deleteAppointment(deletingAppointment);
      }
    }
  };

  const onAppointmentEditClicked = (appointmentTitle: string) => {
    let editingAppointment = appointments.find(
      appointment => appointment.title === appointmentTitle
    );
    if (editingAppointment) {
      setInitialAppointment(editingAppointment);
      setIsCreateAppointmentModalOpen(!isCreateAppointmentModalOpen);
    }
  };

  const handleAppointmentAdded = (appointment: Appointment) => {
    addAppointment(appointment);
    setIsCreateAppointmentModalOpen(false);
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Appointments</h1>
      <>
        <CreateAppointmentForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <AppointmentsTable
          onDeleteClicked={onAppointmentDeleteClicked}
          onEditClicked={onAppointmentEditClicked}
        />
        <EditAppointmentModal
          isOpen={isCreateAppointmentModalOpen}
          onClose={() => setIsCreateAppointmentModalOpen(false)}
          onAppointmentAdded={handleAppointmentAdded}
          initialAppointment={initialAppointment}
        />
      </>
    </div>
  );
};

export default AppointmentsPage;
