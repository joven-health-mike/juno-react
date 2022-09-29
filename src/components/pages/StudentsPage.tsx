// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Student, StudentsContext } from '../../data/students';
import CreateStudentForm from '../forms/CreateStudentForm';
import Navbar from '../navbar/Navbar';
import StudentsTable from '../tables/StudentsTable';

const StudentsPage = () => {
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
        <CreateStudentForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <StudentsTable
          students={students}
          onDeleteClicked={onDeleteStudentClicked}
        />
      </>
    </div>
  );
};

export default StudentsPage;
