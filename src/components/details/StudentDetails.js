// Copyright 2022 Social Fabric, LLC

import React from "react"

const StudentDetails = ({ student }) => {
  return (
    <>
      <label>
        Name:
        <h1>{student.first_name + " " + student.last_name}</h1>
      </label>
      <label>
        School:
        <p>{student.school}</p>
      </label>
      <label>
        Counselor:
        <p>{student.counselor}</p>
      </label>
    </>
  )
}

export default StudentDetails
