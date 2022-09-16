// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Appointment } from '../../data/appointments';
import { CounselorsContext } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { StudentsContext } from '../../data/students';
import { formatDateTime } from '../../utils/DateUtils';

type AppointmentDetailsProps = {
  appointment: Appointment;
};

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
}) => {
  const { students } = useContext(StudentsContext);
  const { counselors } = useContext(CounselorsContext);
  const { schools } = useContext(SchoolsContext);

  const foundStudent = students.filter(
    student => student._id === appointment.studentId
  )[0];
  const studentName = foundStudent.first_name + ' ' + foundStudent.last_name;

  const counselorName = counselors.filter(
    counselor => counselor._id === appointment.counselorId
  )[0].name;

  const schoolName = schools.filter(
    school => school._id === foundStudent.schoolId
  )[0].name;

  return (
    <>
      <h2 data-testid={'title'}>{appointment.title}</h2>
      <p data-testid={'start'}>
        Start Time: {formatDateTime(appointment.start, -6)}
      </p>
      <p data-testid={'end'}>End Time: {formatDateTime(appointment.end, -6)}</p>
      <p data-testid={'counselorId'}>Counselor: {counselorName}</p>
      <p data-testid={'studentId'}>Student: {studentName}</p>
      <p data-testid={'schoolId'}>School: {schoolName}</p>
      <p data-testid={'appointmentType'}>
        Appointment Type: {appointment.type.name}
      </p>
    </>
  );
};

export default AppointmentDetails;
