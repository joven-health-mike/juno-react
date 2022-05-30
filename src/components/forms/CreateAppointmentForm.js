// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  SelectCounselorList,
  SelectFacilitatorList,
  SelectStudentList,
} from "./SelectList"

const CreateAppointmentForm = ({ defaultAppointment, onSubmit, onCancel }) => {
  const emptyAppointment = {
    title: "",
    start: "",
    end: "",
    counselor: "",
    student: "",
    facilitator: "",
  }

  const [appointment, setAppointment] = useState(
    defaultAppointment ?? emptyAppointment
  )

  const onCounselorChanged = (counselorName) => {
    setAppointment({ ...appointment, counselor: counselorName })
  }

  const onFacilitatorChanged = (facilitatorname) => {
    setAppointment({ ...appointment, facilitator: facilitatorname })
  }

  const onStudentChanged = (studentName) => {
    setAppointment({ ...appointment, student: studentName })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const returnAppointment = {
      ...appointment,
      // convert date picker values to strings
      start: appointment.start.toISOString(),
      end: appointment.end.toISOString(),
    }
    onSubmit(returnAppointment)
  }

  const onFormCancel = (e) => {
    e.preventDefault()
    setAppointment(emptyAppointment)
    onCancel()
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Title
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={appointment.title}
          required
          onChange={(e) =>
            setAppointment({ ...appointment, title: e.target.value })
          }
        />
      </label>
      <label>
        Start Time
        <DatePicker
          selected={appointment.start}
          onChange={(date) => setAppointment({ ...appointment, start: date })}
          showTimeSelect
          timeFormat="h:mm"
          timeCaption="Start Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <label>
        End Time
        <DatePicker
          selected={appointment.end}
          onChange={(date) => setAppointment({ ...appointment, end: date })}
          showTimeSelect
          timeFormat="h:mm"
          timeCaption="End Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <label>
        Counselor:{" "}
        <SelectCounselorList
          value={appointment.counselor}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Student:{" "}
        <SelectStudentList
          value={appointment.student}
          onStudentChanged={onStudentChanged}
        />
      </label>
      <label>
        Facilitator:{" "}
        <SelectFacilitatorList
          value={appointment.facilitator}
          onFacilitatorChanged={onFacilitatorChanged}
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  )
}

export default CreateAppointmentForm
