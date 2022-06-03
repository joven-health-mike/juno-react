// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import { Counselor, CounselorsContext } from "../../data/counselors"
import CreateCounselorForm from "../forms/CreateCounselorForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import CounselorsTable from "../tables/CounselorsTable"

const CounselorsPage: React.FC = () => {
  const role = "admin"

  const { counselors, setCounselors } = useContext(CounselorsContext)

  const onFormSubmit = (counselor: Counselor) => {
    setCounselors([...counselors, counselor])
  }

  const onCounselorDeleteClicked = (counselorName: string) => {
    if (window.confirm("Delete this counselor?")) {
      let newCounselors = counselors.filter(
        (counselor) => counselor.name !== counselorName
      )
      setCounselors(newCounselors)
    }
  }

  return (
    <div className={"mainContainer"}>
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
