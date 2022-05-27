// Copyright 2022 Social Fabric, LLC

import React from "react"
import StudentDetails from "../details/StudentDetails"

const StudentDetailPage = ({ student }) => {
  return (
    <>
      <h1>Student Details</h1>
      <StudentDetails student={student} />
    </>
  )
}

export default StudentDetailPage
