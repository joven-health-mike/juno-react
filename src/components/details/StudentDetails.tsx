// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student } from '../../data/students';
import UserDetails from './UserDetails';

type StudentDetailsProps = {
  student: Student;
};

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  const { data: schools } = useContext(SchoolsContext);
  const { data: counselors } = useContext(CounselorsContext);

  const schoolName =
    schools.find(school => school.id === student.studentRef.assignedSchoolId)
      ?.name || 'NOT FOUND';

  const counselor = counselors.find(
    counselor =>
      counselor.counselorRef.id === student.studentRef.assignedCounselorId
  );

  const counselorName = counselor
    ? `${counselor.firstName} ${counselor.lastName}`
    : 'NOT FOUND';

  return (
    <>
      <UserDetails user={student} />
      <p data-testid={'schoolId'}>School: {schoolName}</p>
      <p data-testid={'counselorId'}>Counselor: {counselorName}</p>
      <p data-testid={'status'}>Status: {student.studentRef.status}</p>
    </>
  );
};

export default StudentDetails;
