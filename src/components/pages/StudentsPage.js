// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import { StudentsContext } from "../../data/students"
import CreateStudentForm from "../forms/CreateStudentForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import StudentsTable from "../tables/StudentsTable"
import styles from "./pages.module.css"

const StudentsPage = () => {
  const role = "admin"

  const { students, setStudents } = useContext(StudentsContext)

  const onFormSubmit = (student) => {
    setStudents([...students, student])
  }

  const onDeleteStudentClicked = (studentName) => {
    if (window.confirm("Delete this student?")) {
      let newStudents = students.filter(
        (student) =>
          student.first_name + " " + student.last_name !== studentName
      )
      setStudents(newStudents)
    }
  }

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Students</h1>
      <>
        <CreateStudentForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <StudentsTable
          students={students}
          onDeleteClicked={onDeleteStudentClicked}
        />
      </>
    </div>
  )
}

export default StudentsPage
