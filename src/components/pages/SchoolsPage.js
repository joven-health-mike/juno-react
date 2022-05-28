// Copyright 2022 Social Fabric, LLC

import React from "react"
import { SchoolsContext } from "../../data/schools"
import CreateSchoolForm from "../forms/CreateSchoolForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import SchoolsTable from "../tables/SchoolsTable"
import styles from "./pages.module.css"

const SchoolsPage = () => {
  const role = "admin"

  const onFormSubmit = (school) => {
    console.log("addSchool:", school)
    // figure out how to add the school to the global context object
  }

  const onFormCancel = () => {}

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Schools</h1>
      <SchoolsContext.Consumer>
        {(schools) => {
          return (
            <>
              <CreateSchoolForm
                onSubmit={onFormSubmit}
                onCancel={onFormCancel}
              />
              <SchoolsTable schools={schools} />
            </>
          )
        }}
      </SchoolsContext.Consumer>
    </div>
  )
}

export default SchoolsPage
