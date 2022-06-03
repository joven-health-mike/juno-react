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
      <label>
        Title:
        <h1>{appointment.title}</h1>
      </label>
      <label>
        Start Time:
        <p>{appointment.start.toISOString()}</p>
      </label>
      <label>
        End Time:
        <p>{appointment.end.toISOString()}</p>
      </label>
      <label>
        Counselor:
        <p>{appointment.counselor}</p>
      </label>
      <label>
        Student:
        <p>{appointment.student}</p>
      </label>
      <label>
        Facilitator:
        <p>{appointment.facilitator}</p>
      </label>
    </>
  );
};

export default AppointmentDetails;
