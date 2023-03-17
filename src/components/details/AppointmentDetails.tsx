// Copyright 2022 Social Fabric, LLC

import { Typography } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { Appointment } from '../../data/appointments';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { UsersContext } from '../../data/users';
import { formatDateTime } from '../../utils/DateUtils';

type AppointmentDetailsProps = {
  appointment: Appointment;
  hideTitle?: boolean;
};

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  hideTitle = false,
}) => {
  const { data: users } = useContext(UsersContext);
  const counselors = useMemo(() => getCounselors(users), [users]);
  const { data: schools } = useContext(SchoolsContext);

  const counselor =
    appointment.counselor ||
    counselors.find(counselor => counselor.id === appointment.counselorUserId);

  const counselorName = counselor
    ? `${counselor.firstName} ${counselor.lastName}`
    : 'NOT FOUND';

  const school =
    appointment.school ||
    schools.find(school => school.id === appointment.schoolId);

  const schoolName = school ? school.name : 'NOT FOUND';

  return (
    <>
      {!hideTitle && <Typography variant="h4">{appointment.title}</Typography>}
      <Typography>
        Time:{' '}
        {`${formatDateTime(new Date(appointment.start))} - ${formatDateTime(
          new Date(appointment.end)
        )}`}
      </Typography>
      <Typography>Counselor: {counselorName}</Typography>
      <Typography>School: {schoolName}</Typography>
      <Typography>Participants:</Typography>
      {appointment.participants.map((user, index) => (
        <Typography
          key={index}
        >{`${user.firstName} ${user.lastName} (${user.role})`}</Typography>
      ))}
      <Typography>Type: {appointment.type}</Typography>
      <Typography>Status: {appointment.status}</Typography>
    </>
  );
};

export default AppointmentDetails;
