// Copyright 2022 Social Fabric, LLC

import React from "react"
import FullCalendar from "@fullcalendar/react"
import { Appointment } from "../../data/appointments"

type CalendarProps = {
  view: string
  plugins: any[]
  appointments: Appointment[]
  onEventClick: any
  onDateClick: any
}

type FCEventProps = {
  jsEvent: any
  event: any
  dateStr: string
}

const Calendar: React.FC<CalendarProps> = ({
  view,
  plugins,
  appointments,
  onEventClick,
  onDateClick,
}: CalendarProps) => {
  const shouldSetDateClick = onDateClick ? true : false

  const eventClicked = (info: FCEventProps) => {
    info.jsEvent.preventDefault()
    // this should use the ID instead of the title
    let eventTitle = info.event._def.title
    const theEvent = appointments.filter((appointment) => {
      return appointment.title === eventTitle
    })[0]
    onEventClick(theEvent)
  }

  const dateClicked = (info: FCEventProps) => {
    info.jsEvent.preventDefault()
    onDateClick(info.dateStr)
  }

  if (shouldSetDateClick)
    return (
      <div className={"calendar"}>
        <FullCalendar
          events={appointments}
          plugins={plugins}
          initialView={view}
          eventClick={(info: any) => eventClicked(info)}
          dateClick={(info: any) => dateClicked(info)}
        />
      </div>
    )
  else
    return (
      <div className={"calendar"}>
        <FullCalendar
          events={appointments}
          plugins={plugins}
          initialView={view}
          eventClick={(info: any) => eventClicked(info)}
        />
      </div>
    )
}

export default Calendar
