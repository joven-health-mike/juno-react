// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import {
  Appointment,
  AppointmentsContext,
  emptyAppointment,
} from '../../data/appointments';
import { emptyStudent, Student, StudentsContext } from '../../data/students';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';
import CreateStudentModal from '../modals/CreateStudentModal';
import EditStudentModal from '../modals/EditStudentModal';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
  const {
    add: addStudent,
    delete: deleteStudent,
    update: updateStudent,
  } = useContext(StudentsContext);
  const { add: addAppointment } = useContext(AppointmentsContext);
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState<boolean>(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] =
    useState<boolean>(false);
  const [modalStudent, setModalStudent] = useState<Student>(emptyStudent);
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState<boolean>(false);
  const [modalAppointment, setModalAppointment] =
    useState<Appointment>(emptyAppointment);

  const handleStudentAdded = (student: Student) => {
    addStudent(student);
  };

  const handleStudentEdited = (student: Student) => {
    updateStudent(student);
  };

  const handleAppointmentAdded = (appointment: Appointment) => {
    addAppointment(appointment);
  };

  const onDeleteStudentClicked = (studentToDelete: Student) => {
    if (window.confirm('Delete this student?')) {
      deleteStudent(studentToDelete);
    }
  };

  const onEditStudentClicked = (studentToEdit: Student) => {
    setModalStudent(studentToEdit);
    setIsEditStudentModalOpen(true);
  };

  const onAppointmentStudentClicked = (studentToSchedule: Student) => {
    modalAppointment.participants = [studentToSchedule];
    modalAppointment.counselorId =
      studentToSchedule.studentRef.assignedCounselorId;
    setModalAppointment(modalAppointment);
    setIsCreateAppointmentModalOpen(true);
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Students</h1>
      <>
        <button type="button" onClick={() => setIsCreateStudentModalOpen(true)}>
          Add Student
        </button>
        <CreateAppointmentModal
          isOpen={isCreateAppointmentModalOpen}
          onAppointmentAdded={handleAppointmentAdded}
          onClose={() => setIsCreateAppointmentModalOpen(false)}
          initialAppointment={modalAppointment}
        />
        <CreateStudentModal
          isOpen={isCreateStudentModalOpen}
          onStudentAdded={handleStudentAdded}
          onClose={() => setIsCreateStudentModalOpen(false)}
        />
        <EditStudentModal
          isOpen={isEditStudentModalOpen}
          onStudentEdited={handleStudentEdited}
          onClose={() => setIsEditStudentModalOpen(false)}
          initialStudent={modalStudent}
        />
        <StudentsTable
          onDeleteClicked={onDeleteStudentClicked}
          onEditClicked={onEditStudentClicked}
          onAppointmentClicked={onAppointmentStudentClicked}
        />
      </>
    </div>
  );
};

export default StudentsPage;
