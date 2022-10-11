// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Student } from '../../data/students';
import StudentDetails from '../details/StudentDetails';
import Navbar from '../navbar/Navbar';

type StudentDetailPageProps = {
  student: Student;
};

const StudentDetailPage: React.FC<StudentDetailPageProps> = ({ student }) => {
  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Student Details</h1>
      <StudentDetails student={student} />
    </div>
  );
};

export default StudentDetailPage;
