// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student } from '../../data/students';

type StudentDetailsProps = {
  student: Student;
};

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  const { schools } = useContext(SchoolsContext);
  const { counselors } = useContext(CounselorsContext);

  const schoolName = schools.filter(
    school => school._id === student.schoolId
  )[0].name;

  const counselorName = counselors.filter(
    counselor => counselor._id === student.counselorId
  )[0].name;

  return (
    <>
      <h2>{student.first_name + ' ' + student.last_name}</h2>
      <p>ID: {student._id}</p>
      <p>School: {schoolName}</p>
      <p>Counselor: {counselorName}</p>
    </>
  );
};

export default StudentDetails;
