// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Student, StudentsContext } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
  const {
    add: addStudent,
    delete: deleteStudent,
    update: updateStudent,
  } = useContext(StudentsContext);

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
    // TODO: Add abilitty to schedule student
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Students</h1>
      <>
        <CreateStudentForm onSubmit={onFormSubmit} onCancel={() => {}} />
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
