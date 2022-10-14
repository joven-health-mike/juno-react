// Copyright 2022 Social Fabric, LLC

import React, { useContext, useState, useEffect } from 'react';
import { Student, StudentsContext } from '../../data/students';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState<boolean>(false);
  const { students, setStudents } = useContext(StudentsContext);

  const onFormSubmit = (student: Student) => {
    setStudents([...students, student]);
  };

  const onDeleteStudentClicked = (studentName: string) => {
    if (window.confirm('Delete this student?')) {
      let newStudents = students.filter(
        student => student.first_name + ' ' + student.last_name !== studentName
      );
      setStudents(newStudents);
    }
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Students</h1>
      <>
        <button onClick={() => setIsCreateStudentModalOpen(true)}>
          Add User
        </button>
        <StudentsTable
          students={students}
          onDeleteClicked={onDeleteStudentClicked}
        />
      </>
    </div>
  );
};

export default StudentsPage;
