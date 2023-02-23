// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
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
import { emptyStudent, Student, StudentsContext } from '../../data/students';
import { LoggedInUserContext } from '../../data/users';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';
import CreateStudentModal from '../modals/CreateStudentModal';
import EditStudentModal from '../modals/EditStudentModal';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';
import { buttonStyles, h1Styles } from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

const Header = styled.h1`
  ${h1Styles}
`;

const StudentsPage = () => {
  const {
    add: addStudent,
    delete: deleteStudent,
    update: updateStudent,
  } = useContext(StudentsContext);
  const { add: addAppointment } = useContext(AppointmentsContext);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState<boolean>(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] =
    useState<boolean>(false);
  const [modalStudent, setModalStudent] = useState<Student>(emptyStudent);
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
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
    if (isDeleteStudentAllowed && window.confirm('Delete this student?')) {
      deleteStudent(studentToDelete);
    }
  };

  const onEditStudentClicked = (studentToEdit: Student) => {
    if (isUpdateStudentAllowed) {
      setModalStudent(studentToEdit);
      setIsEditStudentModalOpen(true);
    }
  };

  const onAppointmentStudentClicked = (studentToSchedule: Student) => {
    if (isCreateAppointmentAllowed) {
      modalAppointment.participants = [studentToSchedule];
      modalAppointment.counselorUserId =
        studentToSchedule.studentAssignedCounselorId;
      setModalAppointment(modalAppointment);
      setIsCreateAppointmentModalOpen(true);
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
      <Header>Students</Header>
      <>
        {isCreateStudentAllowed && (
          <>
            <Button
              type="button"
              onClick={() => setIsCreateStudentModalOpen(true)}
            >
              Add Student
            </Button>
            <CreateStudentModal
              isOpen={isCreateStudentModalOpen}
              onStudentAdded={handleStudentAdded}
              onClose={() => setIsCreateStudentModalOpen(false)}
            />
          </>
        )}
        {isCreateAppointmentAllowed && (
          <CreateAppointmentModal
            isOpen={isCreateAppointmentModalOpen}
            onAppointmentAdded={handleAppointmentAdded}
            onClose={() => setIsCreateAppointmentModalOpen(false)}
            initialAppointment={modalAppointment}
          />
        )}
        {isUpdateStudentAllowed && (
          <EditStudentModal
            isOpen={isEditStudentModalOpen}
            onStudentEdited={handleStudentEdited}
            onClose={() => setIsEditStudentModalOpen(false)}
            initialStudent={modalStudent}
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
