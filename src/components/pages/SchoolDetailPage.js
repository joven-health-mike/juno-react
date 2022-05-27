// Copyright 2022 Social Fabric, LLC

import React from "react"
import SchoolDetails from "../details/SchoolDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const SchoolDetailPage = ({ school }) => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>School Details</h1>
      <SchoolDetails school={school} />
    </div>
  )
}

export default SchoolDetailPage
