// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import DatePicker from "react-datepicker"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"
import { StudentsContext } from "../../data/students"
import "react-datepicker/dist/react-datepicker.css"

const CreateAppointmentForm = ({ defaultAppointment, onSubmit, onCancel }) => {
  const [appointment, setAppointment] = useState(defaultAppointment ?? {})

  const onCounselorChanged = (e) => {
    e.preventDefault()
    const counselorName = e.target.value.includes("Select")
      ? ""
      : e.target.value
    console.log("onCounselorChanged:", counselorName)
    setAppointment({ ...appointment, counselor: counselorName })
  }

  const onSchoolChanged = (e) => {
    e.preventDefault()
    const schoolName = e.target.value.includes("Select") ? "" : e.target.value
    console.log("onSchoolChanged:", schoolName)
    setAppointment({ ...appointment, facilitator: schoolName })
  }

  const onStudentChanged = (e) => {
    e.preventDefault()
    const studentName = e.target.value.includes("Select") ? "" : e.target.value
    console.log("onStudentChanged:", studentName)
    setAppointment({ ...appointment, student: studentName })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (appointment.school === "") return alert("Must select a school")
    if (appointment.counselor === "") return alert("Must select a counselor")
    if (appointment.student === "") return alert("Must select a student")
    onSubmit(appointment)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h1>Create Appointment</h1>
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
          {(counselors) => {
            return (
              <>
                <select
                  value={appointment.counselor}
                  onChange={onCounselorChanged}
                >
                  <option key={"Select a Counselor"}>Select a Counselor</option>
                  {counselors.map((counselor) => (
                    <option key={counselor.name}>{counselor.name}</option>
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
          {(students) => {
            return (
              <>
                <select value={appointment.student} onChange={onStudentChanged}>
                  <option key={"Select a Student"}>Select a Student</option>
                  {students.map((student) => (
                    <option key={student.first_name + " " + student.last_name}>
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
          {(schools) => {
            return (
              <>
                <select
                  value={appointment.facilitator}
                  onChange={onSchoolChanged}
                >
                  <option key={"Select a Facilitator"}>
                    Select a Facilitator
                  </option>
                  {schools.map((school) => (
                    <option key={school.name}>{school.name}</option>
                  ))}
                </select>
              </>
            )
          }}
        </SchoolsContext.Consumer>
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

export default CreateAppointmentForm
