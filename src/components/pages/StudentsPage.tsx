// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { Student, StudentsContext } from '../../data/students';
import CreateStudentModal from '../modals/CreateStudentModal';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
  const {
    add: addStudent,
    delete: deleteStudent,
    update: updateStudent,
  } = useContext(StudentsContext);
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState<boolean>(false);

  const onFormSubmit = (student: Student) => {
    addStudent(student);
  };

  const onDeleteStudentClicked = (studentToDelete: Student) => {
    if (window.confirm('Delete this student?')) {
      deleteStudent(studentToDelete);
    }
  };

  const onEditStudentClicked = (studentToEdit: Student) => {
    updateStudent(studentToEdit);
  };

  const onAppointmentStudentClicked = (studentToSchedule: Student) => {
    // TODO: Add ability to schedule student
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
        <CreateStudentModal
          isOpen={isCreateStudentModalOpen}
          onStudentAdded={onFormSubmit}
          onClose={() => setIsCreateStudentModalOpen(false)}
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
