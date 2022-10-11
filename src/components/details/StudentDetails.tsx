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

  const schoolName =
    schools.find(school => school.id === student.studentRef.schoolId)?.name ||
    'NOT FOUND';

  const counselor = counselors.find(
    counselor => counselor.id === student.studentRef.counselorId
  );

  const counselorName = counselor
    ? `${counselor.firstName} ${counselor.lastName}`
    : 'NOT FOUND';

  return (
    <>
      <h2 data-testid={'name'}>{student.firstName + ' ' + student.lastName}</h2>
      <p data-testid={'id'}>ID: {student.id}</p>
      <p data-testid={'schoolId'}>School: {schoolName}</p>
      <p data-testid={'counselorId'}>Counselor: {counselorName}</p>
    </>
  );
};

export default StudentDetails;
