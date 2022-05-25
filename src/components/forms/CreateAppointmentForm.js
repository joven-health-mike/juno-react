// Copyright 2022 Social Fabric, LLC

import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"
import { StudentsContext } from "../../data/students"
import "react-datepicker/dist/react-datepicker.css"

const CreateAppointmentForm = ({ defaultAppointment, onSubmit, onCancel }) => {
  const [appointment, setAppointment] = useState({})

  useEffect(() => setAppointment(defaultAppointment), [defaultAppointment])

  return (
    <form>
      <h1>CreateAppointment</h1>
      <label>
        Title
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={appointment.title}
          required
          onChange={(title) => setAppointment({ ...appointment, title: title })}
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
        <CounselorsContext.Consumer>
          {(counselors) => {
            return (
              <>
                <select></select>
              </>
            )
          }}
        </CounselorsContext.Consumer>
      </label>
      <label>
        Student:{" "}
        <StudentsContext.Consumer>
          {(students) => {
            return (
              <>
                <select></select>
              </>
            )
          }}
        </StudentsContext.Consumer>
      </label>
      <label>
        Facilitator:{" "}
        <SchoolsContext.Consumer>
          {(schools) => {
            return (
              <>
                <select></select>
              </>
            )
          }}
        </SchoolsContext.Consumer>
      </label>
    </form>
  )
}

export default CreateAppointmentForm
