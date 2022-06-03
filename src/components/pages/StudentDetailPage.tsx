// Copyright 2022 Social Fabric, LLC

import React from "react"
import { Student } from "../../data/students"
import StudentDetails from "../details/StudentDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"

type StudentDetailPageProps = {
  student: Student
}

const StudentDetailPage: React.FC<StudentDetailPageProps> = ({ student }) => {
  const role = "admin"

  return (
    <div className={"mainContainer"}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Student Details</h1>
      <StudentDetails student={student} />
    </div>
  )
}

export default StudentDetailPage
