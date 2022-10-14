// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState } from 'react';
import { Student, StudentsContext } from '../../data/students';
import CreateStudentModal from '../modals/CreateStudentModal';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
  const {
    data: students,
    add: addStudent,
    delete: deleteStudent,
  } = useContext(StudentsContext);
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState<boolean>(false);

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
        <button type="button" onClick={() => setIsCreateStudentModalOpen(true)}>
          Add Student
        </button>
        <CreateStudentModal
          isOpen={isCreateStudentModalOpen}
          onStudentAdded={onFormSubmit}
          onClose={() => setIsCreateStudentModalOpen(false)}
        />
        <StudentsTable onDeleteClicked={onDeleteStudentClicked} />
      </>
    </div>
  );
};

export default StudentsPage;
