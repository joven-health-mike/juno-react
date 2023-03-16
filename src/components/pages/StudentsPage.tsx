// Copyright 2022 Social Fabric, LLC

import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
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
import { emptyStudent, Student } from '../../data/students';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import AppointmentDialog from '../modals/AppointmentDialog';
import StudentDialog from '../modals/StudentDialog';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
  const { add: addStudent, update: updateStudent } = useContext(UsersContext);
  const { add: addAppointment } = useContext(AppointmentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateStudentDialogOpen, setIsCreateStudentDialogOpen] =
    useState<boolean>(false);
  const [isEditStudentDialogOpen, setIsEditStudentDialogOpen] =
    useState<boolean>(false);
  const [modalStudent, setModalStudent] = useState<Student>(emptyStudent);
  const [isCreateAppointmentDialogOpen, setIsCreateAppointmentDialogOpen] =
    useState<boolean>(false);
  const [modalAppointment, setModalAppointment] =
    useState<Appointment>(emptyAppointment);
  const [isCreateAppointmentAllowed, setIsCreateAppointmentAllowed] =
    useState<boolean>(false);
  const [isCreateStudentAllowed, setIsCreateStudentAllowed] =
    useState<boolean>(false);
  const [isDeleteStudentAllowed, setIsDeleteStudentAllowed] =
    useState<boolean>(false);
  const [isUpdateStudentAllowed, setIsUpdateStudentAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCreateAppointmentAllowed(
      createPermission(loggedInUser.role, 'appointment')
    );
    setIsCreateStudentAllowed(createPermission(loggedInUser.role, 'student'));
    setIsDeleteStudentAllowed(deletePermission(loggedInUser.role, 'student'));
    setIsUpdateStudentAllowed(updatePermission(loggedInUser.role, 'student'));
  }, [loggedInUser.role]);

  const handleStudentAdded = (student: Student) => {
    if (isCreateStudentAllowed) {
      addStudent(student);
    }
  };

  const handleStudentEdited = (student: Student) => {
    if (isUpdateStudentAllowed) {
      updateStudent(student);
    }
  };

  const handleAppointmentAdded = (appointment: Appointment) => {
    if (isCreateAppointmentAllowed) {
      addAppointment(appointment);
    }
  };

  const onDeleteStudentClicked = (studentToDelete: Student) => {
    if (isDeleteStudentAllowed && window.confirm('Discharge this student?')) {
      studentToDelete.studentStatus = 'DISCHARGED';
      updateStudent(studentToDelete);
    }
  };

  const onEditStudentClicked = (studentToEdit: Student) => {
    if (isUpdateStudentAllowed) {
      setModalStudent(studentToEdit);
      setIsEditStudentDialogOpen(true);
    }
  };

  const onAppointmentStudentClicked = (studentToSchedule: Student) => {
    if (isCreateAppointmentAllowed) {
      modalAppointment.participants = [studentToSchedule];
      modalAppointment.counselorUserId =
        studentToSchedule.studentAssignedCounselorId;
      setModalAppointment(modalAppointment);
      setIsCreateAppointmentDialogOpen(true);
    }
  };

  const onOpenFileStudentClicked = (studentToOpenFile: Student) => {
    window.open(studentToOpenFile.docsUrl);
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Typography variant="h3">Students</Typography>
      <>
        {isCreateStudentAllowed && (
          <>
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={() => {
                setIsCreateStudentDialogOpen(true);
              }}
            >
              Add Student
            </Button>
            <StudentDialog
              isOpen={isCreateStudentDialogOpen}
              onStudentAdded={handleStudentAdded}
              onClose={() => setIsCreateStudentDialogOpen(false)}
              initialStudent={emptyStudent}
              title={'Create Student'}
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
        {isUpdateStudentAllowed && (
          <StudentDialog
            isOpen={isEditStudentDialogOpen}
            onStudentAdded={handleStudentEdited}
            onClose={() => setIsEditStudentDialogOpen(false)}
            initialStudent={modalStudent}
            title={'Edit Student'}
          />
        )}
        <StudentsTable
          onDeleteClicked={onDeleteStudentClicked}
          onEditClicked={onEditStudentClicked}
          onAppointmentClicked={onAppointmentStudentClicked}
          onOpenFileClicked={onOpenFileStudentClicked}
        />
      </>
    </>
  );
};

export default StudentsPage;
