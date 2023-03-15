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
import { LoggedInUserContext, UsersContext } from '../../data/users';
import AppointmentDialog from '../modals/AppointmentDialog';
import Navbar from '../navbar/Navbar';
import TeachersTable from '../tables/TeachersTable';
import { emptyTeacher, Teacher } from '../../data/teachers';
import CreateTeacherModal from '../modals/CreateTeacherModal';
import EditTeacherModal from '../modals/EditTeacherModal';
import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const TeachersPage = () => {
  const { add: addTeacher, update: updateTeacher } = useContext(UsersContext);
  const { add: addAppointment } = useContext(AppointmentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateTeacherModalOpen, setIsCreateTeacherModalOpen] =
    useState<boolean>(false);
  const [isEditTeacherModalOpen, setIsEditTeacherModalOpen] =
    useState<boolean>(false);
  const [modalTeacher, setModalTeacher] = useState<Teacher>(emptyTeacher);
  const [isCreateAppointmentDialogOpen, setIsCreateAppointmentDialogOpen] =
    useState<boolean>(false);
  const [modalAppointment, setModalAppointment] =
    useState<Appointment>(emptyAppointment);
  const [isCreateAppointmentAllowed, setIsCreateAppointmentAllowed] =
    useState<boolean>(false);
  const [isCreateTeacherAllowed, setIsCreateTeacherAllowed] =
    useState<boolean>(false);
  const [isDeleteTeacherAllowed, setIsDeleteTeacherAllowed] =
    useState<boolean>(false);
  const [isUpdateTeacherAllowed, setIsUpdateTeacherAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCreateAppointmentAllowed(
      createPermission(loggedInUser.role, 'appointment')
    );
    setIsCreateTeacherAllowed(createPermission(loggedInUser.role, 'teacher'));
    setIsDeleteTeacherAllowed(deletePermission(loggedInUser.role, 'teacher'));
    setIsUpdateTeacherAllowed(updatePermission(loggedInUser.role, 'teacher'));
  }, [loggedInUser.role]);

  const handleTeacherAdded = (teacher: Teacher) => {
    if (isCreateTeacherAllowed) {
      addTeacher(teacher);
    }
  };

  const handleTeacherEdited = (teacher: Teacher) => {
    if (isUpdateTeacherAllowed) {
      updateTeacher(teacher);
    }
  };

  const handleAppointmentAdded = (appointment: Appointment) => {
    if (isCreateAppointmentAllowed) {
      addAppointment(appointment);
    }
  };

  const onDeleteTeacherClicked = (teacherToDelete: Teacher) => {
    if (isDeleteTeacherAllowed && window.confirm('Discharge this teacher?')) {
      teacherToDelete.studentStatus = 'DISCHARGED';
      updateTeacher(teacherToDelete);
    }
  };

  const onEditTeacherClicked = (teacherToEdit: Teacher) => {
    if (isUpdateTeacherAllowed) {
      setModalTeacher(teacherToEdit);
      setIsEditTeacherModalOpen(true);
    }
  };

  const onAppointmentTeacherClicked = (teacherToSchedule: Teacher) => {
    if (isCreateAppointmentAllowed) {
      modalAppointment.participants = [teacherToSchedule];
      modalAppointment.counselorUserId =
        teacherToSchedule.studentAssignedCounselorId;
      setModalAppointment(modalAppointment);
      setIsCreateAppointmentDialogOpen(true);
    }
  };

  const onOpenFileTeacherClicked = (teacherToOpenFile: Teacher) => {
    window.open(teacherToOpenFile.docsUrl);
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Typography variant="h3">Teachers</Typography>
      <>
        {isCreateTeacherAllowed && (
          <>
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={() => {
                setIsCreateTeacherModalOpen(true);
              }}
            >
              Add Teacher
            </Button>
            <CreateTeacherModal
              isOpen={isCreateTeacherModalOpen}
              onTeacherAdded={handleTeacherAdded}
              onClose={() => setIsCreateTeacherModalOpen(false)}
            />
          </>
        )}
        {isCreateAppointmentAllowed && (
          <AppointmentDialog
            title="Create Appointment"
            isOpen={isCreateAppointmentDialogOpen}
            onAppointmentAdded={handleAppointmentAdded}
            onClose={() => setIsCreateAppointmentDialogOpen(false)}
            initialAppointment={modalAppointment}
          />
        )}
        {isUpdateTeacherAllowed && (
          <EditTeacherModal
            isOpen={isEditTeacherModalOpen}
            onTeacherEdited={handleTeacherEdited}
            onClose={() => setIsEditTeacherModalOpen(false)}
            initialTeacher={modalTeacher}
          />
        )}
        <TeachersTable
          onDeleteClicked={onDeleteTeacherClicked}
          onEditClicked={onEditTeacherClicked}
          onAppointmentClicked={onAppointmentTeacherClicked}
          onOpenFileClicked={onOpenFileTeacherClicked}
        />
      </>
    </>
  );
};

export default TeachersPage;
