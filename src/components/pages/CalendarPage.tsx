// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from "react"
import "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Appointment, AppointmentsContext } from "../../data/appointments"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"
import Calendar from "../calendar/Calendar"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import { SelectCounselorList, SelectSchoolList } from "../selectList/SelectList"
import AddAppointmentModal from "../modals/AddAppointmentModal"

const CalendarPage: React.FC = () => {
  const role = "admin"

  const emptyAppointment: Appointment = {
    title: "",
    start: new Date(),
    end: new Date(),
    counselor: "",
    student: "",
    facilitator: "",
  }

  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] =
    useState<boolean>(false)
  const [showCalendar, setShowCalendar] = useState<boolean>(true)
  const [filteredEvents, setFilteredEvents] = useState<Appointment[]>([])
  const [schoolSelection, setSchoolSelection] = useState<string>("")
  const [counselorSelection, setCounselorSelection] = useState<string>("")
  const [initialAppointment, setInitialAppointment] =
    useState<Appointment>(emptyAppointment)
  const { appointments, setAppointments } = useContext(AppointmentsContext)
  const { counselors } = useContext(CounselorsContext)
  const { schools } = useContext(SchoolsContext)

  const onEventClick = (event: Appointment) => {
    // display AppointmentDetailPage with this event
    console.log("eventClicked:", event)
  }

  const onDateClick = (date: string) => {
    setInitialAppointment({
      ...initialAppointment,
      start: new Date(date + "T08:00"),
      end: new Date(date + "T08:30"),
    })
    setIsAddAppointmentModalOpen(true)
  }

  useEffect(() => {
    setShowCalendar(!isAddAppointmentModalOpen)
  }, [isAddAppointmentModalOpen])

  const handleAppointmentAdded = (appointment: Appointment) => {
    setAppointments([...appointments, appointment])
    setIsAddAppointmentModalOpen(false)
  }

  const handleSchoolChange = async (selectedSchoolName: string) => {
    const selectedSchool = schools.filter(
      (school) => school.name === selectedSchoolName
    )[0]
    const schoolName = selectedSchool === undefined ? "" : selectedSchool.name
    console.log("Selected school changed", schoolName)
    setSchoolSelection(schoolName)
    filterEvents(counselorSelection, schoolName)
  }

  const handleCounselorChange = async (selectedCounselorName: string) => {
    const selectedCounselor = counselors.filter(
      (counselor) => counselor.name === selectedCounselorName
    )[0]
    const counselorName =
      selectedCounselor === undefined ? "" : selectedCounselor.name
    console.log("Selected counselor changed", counselorName)
    setCounselorSelection(counselorName)
    filterEvents(counselorName, schoolSelection)
  }

  const filterEvents = (counselorName: string, schoolName: string) => {
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
    <div className={"mainContainer"}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Calendar</h1>
      <label>
        Counselor:{" "}
        <SelectCounselorList
          value={counselorSelection}
          onCounselorChanged={handleCounselorChange}
        />
      </label>
      <label>
        School:{" "}
        <SelectSchoolList
          value={schoolSelection}
          onSchoolChanged={handleSchoolChange}
        />
      </label>
      {showCalendar && (
        <Calendar
          view="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          appointments={filteredEvents}
          onEventClick={onEventClick}
          onDateClick={onDateClick}
        />
      )}
      <AddAppointmentModal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
        onAppointmentAdded={handleAppointmentAdded}
        initialAppointment={initialAppointment}
      />
    </div>
  )
}

export default CalendarPage
