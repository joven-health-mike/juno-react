// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import { CounselorsContext } from "../../data/counselors"
import CreateCounselorForm from "../forms/CreateCounselorForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import CounselorsTable from "../tables/CounselorsTable"
import styles from "./pages.module.css"

const CounselorsPage = () => {
  const role = "admin"

  const { counselors, setCounselors } = useContext(CounselorsContext)

  const onFormSubmit = (counselor) => {
    setCounselors([...counselors, counselor])
  }

  const onCounselorDeleteClicked = (counselorName) => {
    if (window.confirm("Delete this counselor?")) {
      let newCounselors = counselors.filter(
        (counselor) => counselor.name !== counselorName
      )
      setCounselors(newCounselors)
    }
  }

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Counselors</h1>
      <>
        <CreateCounselorForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <CounselorsTable
          counselors={counselors}
          onDeleteClicked={onCounselorDeleteClicked}
        />
      </>
    </div>
  )
}

export default CounselorsPage
