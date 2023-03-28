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
import { deltaDayStartEndTime } from '../../utils/DateUtils';

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
    let eventId = info.event.id;
    const theEvent = appointments.find(
      appointment => appointment.id === eventId
    )!;
    onEventClick(theEvent);
  };

  const dateClicked = (info: DateClickArg) => {
    if (typeof onDateClick !== 'undefined') {
      info.jsEvent.preventDefault();
      onDateClick(info.dateStr);
    }
  };

  const eventDrop = (info: EventDropArg) => {
    if (typeof onEventDateChanged === 'undefined') return;

    const eventId = info.event.id;
    const appointment = appointments.find(_appt => _appt.id === eventId)!;
    const { newStart, newEnd } = deltaDayStartEndTime(
      appointment.start,
      appointment.end,
      info.delta.days
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
