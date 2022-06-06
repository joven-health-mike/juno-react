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
      <h2>{appointment.title}</h2>
      <p>{appointment._id}</p>
      <p>{appointment.start.toISOString()}</p>
      <p>{appointment.end.toISOString()}</p>
      <p>{appointment.counselorId}</p>
      <p>{appointment.studentId}</p>
    </>
  );
};

export default AppointmentDetails;
