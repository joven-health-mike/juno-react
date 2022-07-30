// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Student } from '../../data/students';

type StudentDetailsProps = {
  student: Student;
};

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  return (
    <>
      <h2 data-testid={'name'}>
        {student.first_name + ' ' + student.last_name}
      </h2>
      <p data-testid={'id'}>{student._id}</p>
      <p data-testid={'schoolId'}>{student.schoolId}</p>
      <p data-testid={'counselorId'}>{student.counselorId}</p>
    </>
  );
};

export default StudentDetails;
