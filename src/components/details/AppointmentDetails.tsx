// Copyright 2022 Social Fabric, LLC

import { Button, ButtonGroup, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { deletePermission } from '../../auth/permissions';
import { Appointment } from '../../data/appointments';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import { formatDateTime } from '../../utils/DateUtils';

type AppointmentDetailsProps = {
  appointment: Appointment;
  onJoinAppointmentClicked?: (appointment: Appointment) => void;
  onEmailParticipantsClicked?: (appointment: Appointment) => void;
  onCancelAppointmentClicked?: (appointment: Appointment) => void;
};

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  onJoinAppointmentClicked,
  onEmailParticipantsClicked,
  onCancelAppointmentClicked,
}) => {
  const { loggedInUser } = useContext(LoggedInUserContext);
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

  const [isDeleteAppointmentAllowed, setIsDeleteAppointmentAllowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsDeleteAppointmentAllowed(
      deletePermission(loggedInUser.role, 'appointment')
    );
  }, [loggedInUser.role]);

  return (
    <>
      <Typography variant="h4">{appointment.title}</Typography>
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
        <Typography>{`${user.firstName} ${user.lastName} (${user.role})`}</Typography>
      ))}
      <Typography>Type: {appointment.type}</Typography>
      <Typography>Status: {appointment.status}</Typography>
      <ButtonGroup variant="contained" aria-label="appointment functions">
        {typeof onJoinAppointmentClicked !== 'undefined' && (
          <Button
            variant="contained"
            aria-label="roomLink"
            onClick={() => {
              onJoinAppointmentClicked(appointment);
            }}
          >
            Join
          </Button>
        )}
        {typeof onEmailParticipantsClicked !== 'undefined' && (
          <Button
            variant="contained"
            aria-label="email"
            onClick={() => {
              onEmailParticipantsClicked(appointment);
            }}
          >
            Email
          </Button>
        )}
        {isDeleteAppointmentAllowed &&
          typeof onCancelAppointmentClicked !== 'undefined' && (
            <Button
              variant="contained"
              aria-label="delete"
              onClick={() => {
                onCancelAppointmentClicked(appointment);
              }}
            >
              Cancel
            </Button>
          )}
      </ButtonGroup>
    </>
  );
};

export default AppointmentDetails;
