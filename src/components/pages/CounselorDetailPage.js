// Copyright 2022 Social Fabric, LLC

import React from "react"
import CounselorDetails from "../details/CounselorDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const CounselorDetailPage = ({ counselor }) => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Counselor Details</h1>
      <CounselorDetails counselor={counselor} />
    </div>
  )
}

export default CounselorDetailPage
