// Copyright 2022 Social Fabric, LLC

import React from "react"
import CounselorDetails from "../details/CounselorDetails"

const CounselorDetailPage = ({ counselor }) => {
  return (
    <>
      <h1>Counselor Details</h1>
      <CounselorDetails counselor={counselor} />
    </>
  )
}

export default CounselorDetailPage
