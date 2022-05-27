// Copyright 2022 Social Fabric, LLC

import React from "react"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const StudentsPage = () => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Students</h1>
    </div>
  )
}

export default StudentsPage
