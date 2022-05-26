// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"

const CreateStudentForm = ({ defaultStudent, onSubmit, onCancel }) => {
  const [student, setStudent] = useState(
    defaultStudent ?? {
      first_name: "",
      last_name: "",
      school: "",
      counselor: "",
    }
  )

  const onCounselorChanged = (e) => {
    e.preventDefault()
    const counselorName = e.target.value.includes("Select")
      ? ""
      : e.target.value
    setStudent({ ...student, counselor: counselorName })
  }

  const onSchoolChanged = (e) => {
    e.preventDefault()
    const schoolName = e.target.value.includes("Select") ? "" : e.target.value
    setStudent({ ...student, school: schoolName })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit(student)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h1>Create Student</h1>
      <label>
        First Name
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={student.first_name}
          required
          onChange={(e) =>
            setStudent({ ...student, first_name: e.target.value })
          }
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={student.last_name}
          required
          onChange={(e) =>
            setStudent({ ...student, last_name: e.target.value })
          }
        />
      </label>
      <label>
        Counselor:{" "}
        <CounselorsContext.Consumer>
          {(counselors) => {
            return (
              <>
                <select value={student.counselor} onChange={onCounselorChanged}>
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
        School:{" "}
        <SchoolsContext.Consumer>
          {(schools) => {
            return (
              <>
                <select value={student.school} onChange={onSchoolChanged}>
                  <option key={"Select a School"}>Select a School</option>
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

export default CreateStudentForm
