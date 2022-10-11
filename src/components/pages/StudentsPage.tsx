// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Student, StudentsContext } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
  const {
    data: students,
    add: addStudent,
    delete: deleteStudent,
  } = useContext(StudentsContext);

  const onFormSubmit = (student: Student) => {
    // setStudents([...students, student]);
    addStudent(student);
  };

  const onDeleteStudentClicked = (studentName: string) => {
    if (window.confirm('Delete this student?')) {
      let studentToDelete = students.find(
        student => `${student.firstName} ${student.lastName}` === studentName
      );
      if (studentToDelete) {
        deleteStudent(studentToDelete);
      }
    }
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Students</h1>
      <>
        <CreateStudentForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <StudentsTable onDeleteClicked={onDeleteStudentClicked} />
      </>
    </div>
  );
};

export default StudentsPage;
