// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Appointment } from '../../data/appointments';
import AppointmentDetails from '../details/AppointmentDetails';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';

type AppointmentDetailPageProps = {
  appointment: Appointment;
};

const AppointmentDetailPage: React.FC<AppointmentDetailPageProps> = ({
  appointment,
}) => {
  const role = 'admin';

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Appointment Details</h1>
      <AppointmentDetails appointment={appointment} />
    </div>
  );
};

export default AppointmentDetailPage;
