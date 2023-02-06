// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import FullCalendar, { EventClickArg, PluginDef } from '@fullcalendar/react';
import { Appointment, getColorForType } from '../../data/appointments';
import { DateClickArg } from '@fullcalendar/interaction';
import { LoggedInUserContext } from '../../data/users';

type CalendarProps = {
  view: string;
  plugins: PluginDef[];
  appointments: Appointment[];
  onEventClick: (appointment: Appointment) => void;
  onDateClick?: (date: string) => void;
};

const Calendar: React.FC<CalendarProps> = ({
  view,
  plugins,
  appointments,
  onEventClick,
  onDateClick,
}: CalendarProps) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  appointments.forEach(appointment => {
    appointment.color = getColorForType(appointment.type);
  });

  const eventClicked = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    let eventId = info.event.id;
    const theEvent = appointments.find(
      appointment => appointment.id === eventId
    );
    if (theEvent) onEventClick(theEvent);
  };

  const dateClicked = (info: DateClickArg) => {
    if (onDateClick) {
      info.jsEvent.preventDefault();
      onDateClick(info.dateStr);
    }
  };

  return (
    <div className={'calendar'}>
      {typeof onDateClick !== 'undefined' && (
        <FullCalendar
          events={appointments}
          plugins={plugins}
          timeZone={loggedInUser.timeZoneIanaName}
          initialView={view}
          eventClick={(info: EventClickArg) => eventClicked(info)}
          dateClick={(info: DateClickArg) => dateClicked(info)}
        />
      )}
      {typeof onDateClick === 'undefined' && (
        <FullCalendar
          events={appointments}
          plugins={plugins}
          timeZone={loggedInUser.timeZoneIanaName}
          initialView={view}
          eventClick={(info: EventClickArg) => eventClicked(info)}
        />
      )}
    </div>
  );
};

export default Calendar;
