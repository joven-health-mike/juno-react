// Copyright 2022 Social Fabric, LLC

import React from "react"
import StudentDetails from "../details/StudentDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const StudentDetailPage = ({ student }) => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Student Details</h1>
      <StudentDetails student={student} />
    </div>
  )
}

export default StudentDetailPage
