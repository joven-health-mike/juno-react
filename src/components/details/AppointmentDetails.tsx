// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Appointment } from '../../data/appointments';
import { CounselorsContext } from '../../data/counselors';
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

  const foundStudent = students.filter(
    student => student._id === appointment.studentId
  )[0];
  const studentName = foundStudent.first_name + ' ' + foundStudent.last_name;

  const counselorName = counselors.filter(
    counselor => counselor._id === appointment.counselorId
  )[0].name;

  return (
    <>
      <h2>{appointment.title}</h2>
      <p>ID: {appointment._id}</p>
      <p>Start Time: {formatDateTime(appointment.start, -6)}</p>
      <p>End Time: {formatDateTime(appointment.end, -6)}</p>
      <p>Counselor: {counselorName}</p>
      <p>Student: {studentName}</p>
    </>
  );
};

export default AppointmentDetails;
