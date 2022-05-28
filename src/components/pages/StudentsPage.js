// Copyright 2022 Social Fabric, LLC

import React from "react"
import { StudentsContext } from "../../data/students"
import CreateStudentForm from "../forms/CreateStudentForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import StudentsTable from "../tables/StudentsTable"
import styles from "./pages.module.css"

const StudentsPage = () => {
  const role = "admin"

  const onFormSubmit = (student) => {
    console.log("addStudent:", student)
    // figure out how to add the student to the global context object
  }

  const onFormCancel = () => {}

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Students</h1>
      <StudentsContext.Consumer>
        {(students) => {
          return (
            <>
              <CreateStudentForm
                onSubmit={onFormSubmit}
                onCancel={onFormCancel}
              />
              <StudentsTable students={students} />
            </>
          )
        }}
      </StudentsContext.Consumer>
    </div>
  )
}

export default StudentsPage
