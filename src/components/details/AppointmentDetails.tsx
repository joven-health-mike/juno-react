// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { deletePermission } from '../../auth/permissions';
import { Appointment } from '../../data/appointments';
import { getCounselors } from '../../data/counselors';
import { SchoolsContext } from '../../data/schools';
import { LoggedInUserContext, UsersContext } from '../../data/users';
import { formatDateTime } from '../../utils/DateUtils';
import { buttonStyles } from '../styles/mixins';

const Button = styled.button`
  ${buttonStyles}
`;

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
      <h2 data-testid={'title'}>{appointment.title}</h2>
      <p data-testid={'time'}>
        Time:{' '}
        {`${formatDateTime(new Date(appointment.start))} - ${formatDateTime(
          new Date(appointment.end)
        )}`}
      </p>
      <p data-testid={'counselorId'}>Counselor: {counselorName}</p>
      <p data-testid={'schoolId'}>School: {schoolName}</p>
      <p data-testid={'participants'}>Participants:</p>
      {appointment.participants.map((user, index) => (
        <p key={index}>{`${user.firstName} ${user.lastName} (${user.role})`}</p>
      ))}
      <p data-testid={'appointmentType'}>Type: {appointment.type}</p>
      <p data-testid={'appointmentStatus'}>Status: {appointment.status}</p>
      <div>
        {typeof onJoinAppointmentClicked !== 'undefined' && (
          <Button onClick={() => onJoinAppointmentClicked(appointment)}>
            Join Appointment
          </Button>
        )}

        {typeof onEmailParticipantsClicked !== 'undefined' && (
          <Button onClick={() => onEmailParticipantsClicked(appointment)}>
            Email Participants
          </Button>
        )}

        {isDeleteAppointmentAllowed &&
          typeof onCancelAppointmentClicked !== 'undefined' && (
            <Button onClick={() => onCancelAppointmentClicked(appointment)}>
              Cancel Appointment
            </Button>
          )}
      </div>
    </>
  );
};

export default AppointmentDetails;
