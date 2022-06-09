// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Appointment } from '../../data/appointments';

type AppointmentDetailsProps = {
  appointment: Appointment;
};

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
}) => {
  return (
    <>
      <h2 data-testid={'title'}>{appointment.title}</h2>
      <p data-testid={'id'}>{appointment._id}</p>
      <p data-testid={'start'}>{appointment.start.toISOString()}</p>
      <p data-testid={'end'}>{appointment.end.toISOString()}</p>
      <p data-testid={'counselorId'}>{appointment.counselorId}</p>
      <p data-testid={'studentId'}>{appointment.studentId}</p>
    </>
  );
};

export default AppointmentDetails;
