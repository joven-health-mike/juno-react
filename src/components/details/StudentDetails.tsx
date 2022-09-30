// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student } from '../../data/students';

type StudentDetailsProps = {
  student: Student;
};

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  const { data: schools } = useContext(SchoolsContext);
  const { data: counselors } = useContext(CounselorsContext);

  const schoolName = schools.filter(school => school.id === student.schoolId)[0]
    .name;

  const counselor = counselors.filter(
    counselor => counselor.id === student.counselorId
  )[0];

  const counselorName = `${counselor.firstName} ${counselor.lastName}`;

  return (
    <>
      <h2 data-testid={'name'}>
        {student.first_name + ' ' + student.last_name}
      </h2>
      <p data-testid={'id'}>ID: {student._id}</p>
      <p data-testid={'schoolId'}>School: {schoolName}</p>
      <p data-testid={'counselorId'}>Counselor: {counselorName}</p>
    </>
  );
};

export default StudentDetails;
