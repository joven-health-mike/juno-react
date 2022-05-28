// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import DatePicker from "react-datepicker"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"
import { StudentsContext } from "../../data/students"
import "react-datepicker/dist/react-datepicker.css"

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

  const onCounselorChanged = (e) => {
    e.preventDefault()
    const counselorName = e.target.value.includes("Select")
      ? ""
      : e.target.value
    setAppointment({ ...appointment, counselor: counselorName })
  }

  const onSchoolChanged = (e) => {
    e.preventDefault()
    const schoolName = e.target.value.includes("Select") ? "" : e.target.value
    setAppointment({ ...appointment, facilitator: schoolName })
  }

  const onStudentChanged = (e) => {
    e.preventDefault()
    const studentName = e.target.value.includes("Select") ? "" : e.target.value
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
        <CounselorsContext.Consumer>
          {(value) => {
            return (
              <>
                <select
                  value={appointment.counselor}
                  onChange={onCounselorChanged}
                >
                  <option key={"Select a Counselor"}>Select a Counselor</option>
                  {value.counselors.map((counselor, index) => (
                    <option key={index}>{counselor.name}</option>
                  ))}
                </select>
              </>
            )
          }}
        </CounselorsContext.Consumer>
      </label>
      <label>
        Student:{" "}
        <StudentsContext.Consumer>
          {(value) => {
            return (
              <>
                <select value={appointment.student} onChange={onStudentChanged}>
                  <option key={"Select a Student"}>Select a Student</option>
                  {value.students.map((student, index) => (
                    <option key={index}>
                      {student.first_name + " " + student.last_name}
                    </option>
                  ))}
                </select>
              </>
            )
          }}
        </StudentsContext.Consumer>
      </label>
      <label>
        Facilitator:{" "}
        <SchoolsContext.Consumer>
          {(value) => {
            return (
              <>
                <select
                  value={appointment.facilitator}
                  onChange={onSchoolChanged}
                >
                  <option key={"Select a Facilitator"}>
                    Select a Facilitator
                  </option>
                  {value.schools.map((school, index) => (
                    <option key={index}>{school.name}</option>
                  ))}
                </select>
              </>
            )
          }}
        </SchoolsContext.Consumer>
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  )
}

export default CreateAppointmentForm
