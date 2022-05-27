// Copyright 2022 Social Fabric, LLC

import React from "react"
import { CounselorsContext } from "../../data/counselors"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import CounselorsTable from "../tables/CounselorsTable"
import styles from "./pages.module.css"

const CounselorsPage = () => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Counselors</h1>
      <CounselorsContext.Consumer>
        {(counselors) => {
          return <CounselorsTable counselors={counselors} />
        }}
      </CounselorsContext.Consumer>
    </div>
  )
}

export default CounselorsPage
