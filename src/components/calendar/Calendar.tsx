// Copyright 2022 Social Fabric, LLC

import React from 'react';
import FullCalendar, { EventClickArg, PluginDef } from '@fullcalendar/react';
import { Appointment, getColorForType } from '../../data/appointments';
import { DateClickArg } from '@fullcalendar/interaction';

type CalendarProps = {
  view: string;
  plugins: PluginDef[];
  appointments: Appointment[];
  onEventClick: (appointment: Appointment) => void;
  onDateClick: (date: string) => void;
};

const Calendar: React.FC<CalendarProps> = ({
  view,
  plugins,
  appointments,
  onEventClick,
  onDateClick,
}: CalendarProps) => {
  appointments.forEach(appointment => {
    appointment.color = getColorForType(appointment.type);
  });

  const eventClicked = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    // this should use the ID instead of the title
    let eventTitle = info.event._def.title;
    const theEvent = appointments.filter(appointment => {
      return appointment.title === eventTitle;
    })[0];
    onEventClick(theEvent);
  };

  const dateClicked = (info: DateClickArg) => {
    info.jsEvent.preventDefault();
    onDateClick(info.dateStr);
  };

  return (
    <div className={'calendar'}>
      <FullCalendar
        events={appointments}
        plugins={plugins}
        initialView={view}
        eventClick={(info: EventClickArg) => eventClicked(info)}
        dateClick={(info: DateClickArg) => dateClicked(info)}
      />
    </div>
  );
};

export default Calendar;
