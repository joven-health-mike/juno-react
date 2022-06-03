// Copyright 2022 Social Fabric, LLC

import React from "react"
import { School } from "../../data/schools"

type SchoolDetailsProps = {
  school: School
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ school }) => {
  return (
    <>
      <label>
        Name:
        <h1>{school.name}</h1>
      </label>
      <label>
        Email:
        <p>{school.email}</p>
      </label>
      <label>
        Facilitators:
        {school.facilitators.map((facilitatorName, index) => (
          <p key={index}>{facilitatorName}</p>
        ))}
      </label>
    </>
  )
}

export default SchoolDetails
