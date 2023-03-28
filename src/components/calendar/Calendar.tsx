// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import FullCalendar, {
  EventClickArg,
  EventDropArg,
  PluginDef,
} from '@fullcalendar/react';
import styled from 'styled-components';
import {
  Appointment,
  AppointmentColors,
  APPOINTMENT_TYPES,
} from '../../data/appointments';
import { DateClickArg } from '@fullcalendar/interaction';
import { LoggedInUserContext } from '../../data/users';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1300px;
`;

type CalendarProps = {
  view: string;
  plugins: PluginDef[];
  appointments: Appointment[];
  onEventClick: (appointment: Appointment) => void;
  onEventDateChanged?: (
    appointment: Appointment,
    newStart: Date,
    newEnd: Date
  ) => void;
  onDateClick?: (date: string) => void;
};

const Calendar: React.FC<CalendarProps> = ({
  view,
  plugins,
  appointments,
  onEventClick,
  onEventDateChanged,
  onDateClick,
}: CalendarProps) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const dateChangeProps =
    typeof onEventDateChanged !== 'undefined'
      ? {
          editable: true,
          eventDrop: (info: EventDropArg) => eventDrop(info),
        }
      : {};

  const dateClickProps =
    typeof onDateClick !== 'undefined'
      ? { dateClick: (info: DateClickArg) => dateClicked(info) }
      : {};

  appointments.forEach(appointment => {
    appointment.color =
      AppointmentColors[APPOINTMENT_TYPES.indexOf(appointment.type)];
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

  const eventDrop = (info: EventDropArg) => {
    if (typeof onEventDateChanged === 'undefined') return;

    const eventId = info.event.id;
    const appointment = appointments.find(_appt => _appt.id === eventId)!;
    const newStart = new Date(
      new Date(appointment.start).getTime() +
        info.delta.days * 24 * 60 * 60 * 1000
    );
    const newEnd = new Date(
      new Date(appointment.end).getTime() +
        info.delta.days * 24 * 60 * 60 * 1000
    );

    onEventDateChanged(appointment, newStart, newEnd);
  };

  return (
    <Wrapper>
      <FullCalendar
        events={appointments}
        plugins={plugins}
        timeZone={loggedInUser.timeZoneIanaName}
        initialView={view}
        eventClick={(info: EventClickArg) => eventClicked(info)}
        {...dateClickProps}
        {...dateChangeProps}
      />
    </Wrapper>
  );
};

export default Calendar;
