// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"

const CreateStudentForm = ({ defaultStudent, onSubmit, onCancel }) => {
  const emptyStudent = {
    first_name: "",
    last_name: "",
    school: "",
    counselor: "",
  }

  const [student, setStudent] = useState(defaultStudent ?? emptyStudent)

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

  const onFormCancel = (e) => {
    e.preventDefault()
    setStudent(emptyStudent)
    onCancel()
  }

  return (
    <form onSubmit={onFormSubmit}>
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
          {(value) => {
            return (
              <>
                <select value={student.counselor} onChange={onCounselorChanged}>
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
        School:{" "}
        <SchoolsContext.Consumer>
          {(value) => {
            return (
              <>
                <select value={student.school} onChange={onSchoolChanged}>
                  <option key={"Select a School"}>Select a School</option>
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

export default CreateStudentForm
