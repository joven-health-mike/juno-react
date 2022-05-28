// Copyright 2022 Social Fabric, LLC

import React from "react"
import { CounselorsContext } from "../../data/counselors"
import CreateCounselorForm from "../forms/CreateCounselorForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import CounselorsTable from "../tables/CounselorsTable"
import styles from "./pages.module.css"

const CounselorsPage = () => {
  const role = "admin"

  const onFormSubmit = (counselor) => {
    console.log("addCounselor:", counselor)
    // figure out how to add the counselor to the global context object
  }

  const onFormCancel = () => {}

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Counselors</h1>
      <CounselorsContext.Consumer>
        {(counselors) => {
          return (
            <>
              <CreateCounselorForm
                onSubmit={onFormSubmit}
                onCancel={onFormCancel}
              />
              <CounselorsTable counselors={counselors} />
            </>
          )
        }}
      </CounselorsContext.Consumer>
    </div>
  )
}

export default CounselorsPage
