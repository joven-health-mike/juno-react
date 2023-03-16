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
import AppointmentDialog from '../dialogs/AppointmentDialog';
import Navbar from '../navbar/Navbar';
import TeachersTable from '../tables/TeachersTable';
import { emptyTeacher, Teacher } from '../../data/teachers';
import StudentDialog from '../dialogs/StudentDialog';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const TeachersPage = () => {
  const { add: addTeacher, update: updateTeacher } = useContext(UsersContext);
  const { add: addAppointment } = useContext(AppointmentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateTeacherDialogOpen, setIsCreateTeacherDialogOpen] =
    useState<boolean>(false);
  const [isEditTeacherDialogOpen, setIsEditTeacherDialogOpen] =
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
      setIsEditTeacherDialogOpen(true);
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
            <Box sx={{ mb: 2, mt: 2 }} justifyContent="center" display="flex">
              <Button
                variant="contained"
                endIcon={<Add />}
                onClick={() => {
                  setIsCreateTeacherDialogOpen(true);
                }}
              >
                Add Teacher
              </Button>
            </Box>
            <StudentDialog
              isOpen={isCreateTeacherDialogOpen}
              onStudentAdded={handleTeacherAdded}
              onClose={() => setIsCreateTeacherDialogOpen(false)}
              initialStudent={emptyTeacher}
              title={'Create Teacher'}
              isTeacher={true}
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
          <StudentDialog
            isOpen={isEditTeacherDialogOpen}
            onStudentAdded={handleTeacherEdited}
            onClose={() => setIsEditTeacherDialogOpen(false)}
            initialStudent={modalTeacher}
            title={'Edit Teacher'}
            isTeacher={true}
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
