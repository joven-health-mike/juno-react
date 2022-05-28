// Copyright 2022 Social Fabric, LLC

import React, { useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"

const Calendar = ({
  appointments,
  counselors,
  schools,
  students,
  onEventClick,
  onDateClick,
}) => {
  const calendarRef = useRef(null)

  const eventClicked = (info) => {
    info.jsEvent.preventDefault()
    let eventId = info.event._def.extendedProps._id
    const theEvent = appointments.filter((event) => {
      return event._id === eventId
    })[0]
    onEventClick(theEvent)
  }

  const dateClicked = (info) => {
    info.jsEvent.preventDefault()
    onDateClick(info.dateStr)
  }

  return (
    <FullCalendar
      ref={calendarRef}
      events={appointments}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      eventClick={(info) => eventClicked(info)}
      dateClick={(info) => dateClicked(info)}
    />
  )
}

export default Calendar
