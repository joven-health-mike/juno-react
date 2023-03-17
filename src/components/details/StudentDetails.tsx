// Copyright 2022 Social Fabric, LLC

import { Typography } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { Student } from '../../data/students';
import { UsersContext } from '../../data/users';
import UserDetails from './UserDetails';

type StudentDetailsProps = {
  student: Student;
};

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  const { data: schools } = useContext(SchoolsContext);
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);

  const schoolName =
    schools.find(school => school.id === student.studentAssignedSchoolId)
      ?.name || 'NOT FOUND';

  const counselor = counselors.find(
    counselor => counselor.id === student.studentAssignedCounselorId
  );

  const counselorName = counselor
    ? `${counselor.firstName} ${counselor.lastName}`
    : 'NOT FOUND';

  return (
    <>
      <UserDetails user={student} />
      <Typography>School: {schoolName}</Typography>
      <Typography>Counselor: {counselorName}</Typography>
      <Typography>Status: {student.studentStatus}</Typography>
    </>
  );
};

export default StudentDetails;
