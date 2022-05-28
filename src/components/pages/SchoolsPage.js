// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import { SchoolsContext } from "../../data/schools"
import CreateSchoolForm from "../forms/CreateSchoolForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import SchoolsTable from "../tables/SchoolsTable"
import styles from "./pages.module.css"

const SchoolsPage = () => {
  const role = "admin"

  const { schools, setSchools } = useContext(SchoolsContext)

  const onFormSubmit = (school) => {
    setSchools([...schools, school])
  }

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Schools</h1>
      <>
        <CreateSchoolForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <SchoolsTable schools={schools} />
      </>
    </div>
  )
}

export default SchoolsPage
