// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';
import Calendar from '../calendar/Calendar';
import { Appointment, AppointmentsContext } from '../../data/appointments';

const HomePage: React.FC = () => {
  const role = 'admin';

  const { appointments } = useContext(AppointmentsContext);

  const onEventClick = (event: Appointment) => {
    // display AppointmentDetailPage with this event
    console.log('eventClicked:', event);
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Home</h1>
      <Calendar
        view="listDay"
        plugins={[listPlugin]}
        appointments={appointments}
        onEventClick={onEventClick}
        onDateClick={() => {}}
      />
    </div>
  );
};

export default HomePage;
