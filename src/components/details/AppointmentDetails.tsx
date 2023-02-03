// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { buttonStyles } from '../styles/mixins';
import { deletePermission } from '../../auth/permissions';
import { Appointment } from '../../data/appointments';
import { LoggedInUserContext } from '../../data/users';
import { formatDateTime } from '../../utils/DateUtils';

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
      <p data-testid={'counselorId'}>
        Counselor:{' '}
        {`${appointment.counselor?.firstName} ${appointment.counselor?.lastName}`}
      </p>
      <p data-testid={'schoolId'}>School: {appointment.school?.name}</p>
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
