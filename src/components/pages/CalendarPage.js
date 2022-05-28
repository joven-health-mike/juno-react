// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from "react"
import "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { AppointmentsContext } from "../../data/appointments"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"
import { StudentsContext } from "../../data/students"
import Calendar from "../calendar/Calendar"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const CalendarPage = () => {
  const role = "admin"

  const [filteredEvents, setFilteredEvents] = useState([])
  const [schoolSelection, setSchoolSelection] = useState("")
  const [counselorSelection, setCounselorSelection] = useState("")
  const appointments = useContext(AppointmentsContext)
  const counselors = useContext(CounselorsContext)
  const schools = useContext(SchoolsContext)

  const onEventClick = (event) => {
    // display AppointmentDetailPage with this event
    console.log("eventClicked:", event)
  }

  const onDateClick = (date) => {
    // display new appointment form
    console.log("dateClicked:", date)
  }

  const handleSchoolChange = async (e) => {
    const selectedSchool = schools.filter(
      (school) => school.name === e.target.value
    )[0]
    const schoolName = selectedSchool === undefined ? "" : selectedSchool.name
    console.log("Selected school changed", schoolName)
    setSchoolSelection(schoolName)
    filterEvents(counselorSelection, schoolName)
  }

  const handleCounselorChange = async (e) => {
    const selectedCounselor = counselors.filter(
      (counselor) => counselor.name === e.target.value
    )[0]
    const counselorName =
      selectedCounselor === undefined ? "" : selectedCounselor.name
    console.log("Selected counselor changed", counselorName)
    setCounselorSelection(counselorName)
    filterEvents(counselorName, schoolSelection)
  }

  const filterEvents = (counselorName, schoolName) => {
    console.log("filterEvents:", counselorName, schoolName)
    const filteredEvents = appointments.filter((event) => {
      let counselorMatch =
        counselorName === "" || counselorName === event.counselor
      let schoolMatch = schoolName === "" || schoolName === event.facilitator
      return counselorMatch && schoolMatch
    })
    setFilteredEvents(filteredEvents)
  }

  useEffect(() => {
    setFilteredEvents(appointments)
  }, [appointments])

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Calendar</h1>
      <StudentsContext.Consumer>
        {(students) => (
          <>
            <label className={styles.flatLabel}>
              School:{" "}
              <select value={schoolSelection} onChange={handleSchoolChange}>
                <option>Select a School</option>
                {schools.map((school, index) => (
                  <option key={index} value={school.name}>
                    {school.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.flatLabel}>
              Counselor:{" "}
              <select
                value={counselorSelection}
                onChange={handleCounselorChange}
              >
                <option>Select a Counselor</option>
                {counselors.map((counselor, index) => (
                  <option key={index} value={counselor.name}>
                    {counselor.name}
                  </option>
                ))}
              </select>
            </label>
            <Calendar
              view="dayGridMonth"
              plugins={[dayGridPlugin, interactionPlugin]}
              appointments={filteredEvents}
              onEventClick={onEventClick}
              onDateClick={onDateClick}
            />
          </>
        )}
      </StudentsContext.Consumer>
    </div>
  )
}

export default CalendarPage
