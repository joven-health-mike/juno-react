// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Student } from '../../data/students';

type StudentDetailsProps = {
  student: Student;
};

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  return (
    <>
      <h2>{student.first_name + ' ' + student.last_name}</h2>
      <p>{student._id}</p>
      <p>{student.schoolId}</p>
      <p>{student.counselorId}</p>
    </>
  );
};

export default StudentDetails;
