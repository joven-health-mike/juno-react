// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Appointment } from '../../data/appointments';
import { LoggedInUserContext } from '../../data/users';
import { formatDateTime } from '../../utils/DateUtils';

type AppointmentDetailsProps = {
  appointment: Appointment;
};

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
}) => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  return (
    <>
      <h2 data-testid={'title'}>{appointment.title}</h2>
      <p data-testid={'time'}>
        Time:{' '}
        {`${formatDateTime(
          new Date(appointment.start),
          loggedInUser.timeZoneIanaName
        )} - ${formatDateTime(
          new Date(appointment.end),
          loggedInUser.timeZoneIanaName
        )}`}
      </p>
      <p data-testid={'counselorId'}>
        Counselor:{' '}
        {`${appointment.counselor?.user?.firstName} ${appointment.counselor?.user?.lastName}`}
      </p>
      <p data-testid={'schoolId'}>School: {appointment.school?.name}</p>
      <p data-testid={'participants'}>Participants:</p>
      {appointment.participants.map((user, index) => (
        <p key={index}>{`${user.firstName} ${user.lastName} (${user.role})`}</p>
      ))}
      <p data-testid={'appointmentType'}>Type: {appointment.type}</p>
      <p data-testid={'appointmentStatus'}>Status: {appointment.status}</p>
      <p data-testid={'isRecurring'}>Recurring: {appointment.isRecurring}</p>
    </>
  );
};

export default AppointmentDetails;
