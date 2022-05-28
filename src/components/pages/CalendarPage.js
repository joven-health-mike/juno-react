// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from "react"
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

  const onEventClick = (event) => {
    console.log("eventClicked:", event)
    if (window.confirm("Delete the appointment?")) {
      // delete the appointment
    }
  }

  const onDateClick = (date) => {
    // display new appointment form
    console.log("dateClicked:", date)
  }

  const handleSchoolChange = async (e, appointments, schools) => {
    const selectedSchool = schools.filter(
      (school) => school.name === e.target.value
    )[0]
    const schoolName = selectedSchool === undefined ? "" : selectedSchool.name
    console.log("Selected school changed", schoolName)
    setSchoolSelection(schoolName)
    filterEvents(counselorSelection, schoolName, appointments)
  }

  const handleCounselorChange = async (e, appointments, counselors) => {
    const selectedCounselor = counselors.filter(
      (counselor) => counselor.name === e.target.value
    )[0]
    const counselorName =
      selectedCounselor === undefined ? "" : selectedCounselor.name
    console.log("Selected counselor changed", counselorName)
    setCounselorSelection(counselorName)
    filterEvents(counselorName, schoolSelection, appointments)
  }

  const filterEvents = (counselorName, schoolName, appointments) => {
    console.log("filterEvents:", counselorName, schoolName)
    const filteredEvents = appointments.filter((event) => {
      let counselorMatch =
        counselorName === "" || counselorName === event.counselor
      let schoolMatch = schoolName === "" || schoolName === event.school
      return counselorMatch && schoolMatch
    })
    setFilteredEvents(filteredEvents)
  }

  useEffect(() => {
    setFilteredEvents(appointments)
  })

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Calendar</h1>
      <AppointmentsContext.Consumer>
        {(appointments) => (
          <CounselorsContext.Consumer>
            {(counselors) => (
              <SchoolsContext.Consumer>
                {(schools) => (
                  <StudentsContext.Consumer>
                    {(students) => (
                      <>
                        <label className={styles.flatLabel}>
                          School:{" "}
                          <select
                            value={schoolSelection}
                            onChange={(e) =>
                              handleSchoolChange(e, appointments, schools)
                            }
                          >
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
                            onChange={(e) =>
                              handleCounselorChange(e, appointments, counselors)
                            }
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
                          appointments={filteredEvents}
                          counselors={counselors}
                          schools={schools}
                          students={students}
                          onEventClick={onEventClick}
                          onDateClick={onDateClick}
                        />
                      </>
                    )}
                  </StudentsContext.Consumer>
                )}
              </SchoolsContext.Consumer>
            )}
          </CounselorsContext.Consumer>
        )}
      </AppointmentsContext.Consumer>
    </div>
  )
}

export default CalendarPage
