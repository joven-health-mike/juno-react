// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { Appointment } from '../../data/appointments';
import AppointmentDetails from '../details/AppointmentDetails';
import Navbar from '../navbar/Navbar';

type AppointmentDetailPageProps = {
  appointment: Appointment;
};

const AppointmentDetailPage: React.FC<AppointmentDetailPageProps> = ({
  appointment,
}) => {
  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar />
      </nav>
      <h1>Appointment Details</h1>
      <AppointmentDetails appointment={appointment} />
    </div>
  );
};

export default AppointmentDetailPage;
