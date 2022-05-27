// Copyright 2022 Social Fabric, LLC

import React from "react"
import { StudentsContext } from "../../data/students"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import StudentsTable from "../tables/StudentsTable"
import styles from "./pages.module.css"

const StudentsPage = () => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Students</h1>
      <StudentsContext.Consumer>
        {(students) => {
          return <StudentsTable students={students} />
        }}
      </StudentsContext.Consumer>
    </div>
  )
}

export default StudentsPage
