// Copyright 2022 Social Fabric, LLC

import React from "react"
import FullCalendar from "@fullcalendar/react"
import styles from "./calendar.module.css"

const Calendar = ({
  view,
  plugins,
  appointments,
  onEventClick,
  onDateClick,
}) => {
  const shouldSetDateClick = onDateClick ? true : false

  const eventClicked = (info) => {
    info.jsEvent.preventDefault()
    // this should use the ID instead of the title
    let eventTitle = info.event._def.title
    const theEvent = appointments.filter((appointment) => {
      return appointment.title === eventTitle
    })[0]
    onEventClick(theEvent)
  }

  const dateClicked = (info) => {
    info.jsEvent.preventDefault()
    onDateClick(info.dateStr)
  }

  if (shouldSetDateClick)
    return (
      <div className={styles.calendar}>
        <FullCalendar
          events={appointments}
          plugins={plugins}
          initialView={view}
          eventClick={(info) => eventClicked(info)}
          dateClick={(info) => dateClicked(info)}
        />
      </div>
    )
  else
    return (
      <div className={styles.calendar}>
        <FullCalendar
          events={appointments}
          plugins={plugins}
          initialView={view}
          eventClick={(info) => eventClicked(info)}
        />
      </div>
    )
}

export default Calendar
