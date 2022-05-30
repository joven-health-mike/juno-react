// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import { SelectCounselorList, SelectSchoolList } from "./SelectList"

const CreateStudentForm = ({ defaultStudent, onSubmit, onCancel }) => {
  const emptyStudent = {
    first_name: "",
    last_name: "",
    school: "",
    counselor: "",
  }

  const [student, setStudent] = useState(defaultStudent ?? emptyStudent)

  const onCounselorChanged = (counselorName) => {
    setStudent({ ...student, counselor: counselorName })
  }

  const onSchoolChanged = (schoolName) => {
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
        <SelectCounselorList
          value={student.counselor}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        School:{" "}
        <SelectSchoolList
          value={student.school}
          onSchoolChanged={onSchoolChanged}
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  )
}

export default CreateStudentForm
