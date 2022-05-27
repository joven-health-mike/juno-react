// Copyright 2022 Social Fabric, LLC

import React from "react"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const SchoolsPage = () => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Schools</h1>
    </div>
  )
}

export default SchoolsPage
