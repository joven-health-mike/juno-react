// Copyright 2022 Social Fabric, LLC

import React from "react"
import { Counselor } from "../../data/counselors"
import CounselorDetails from "../details/CounselorDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"

type CounselorDetailPageProps = {
  counselor: Counselor
}

const CounselorDetailPage: React.FC<CounselorDetailPageProps> = ({
  counselor,
}) => {
  const role = "admin"

  return (
    <div className={"mainContainer"}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Counselor Details</h1>
      <CounselorDetails counselor={counselor} />
    </div>
  )
}

export default CounselorDetailPage
