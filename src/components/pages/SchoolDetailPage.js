// Copyright 2022 Social Fabric, LLC

import React from "react"
import SchoolDetails from "../details/SchoolDetails"

const SchoolDetailPage = ({ school }) => {
  return (
    <>
      <h1>School Details</h1>
      <SchoolDetails school={school} />
    </>
  )
}

export default SchoolDetailPage
