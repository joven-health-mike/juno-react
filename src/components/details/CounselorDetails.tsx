// Copyright 2022 Social Fabric, LLC

import React from "react"
import { Counselor } from "../../data/counselors"

type CounselorDetailsProps = {
  counselor: Counselor
}

const CounselorDetails: React.FC<CounselorDetailsProps> = ({ counselor }) => {
  return (
    <>
      <label>
        Name:
        <h1>{counselor.name}</h1>
      </label>
      <label>
        Email:
        <p>{counselor.email}</p>
      </label>
      <label>
        Room Link:
        <p>{counselor.roomLink}</p>
      </label>
      <label>
        Assigned Schools:
        {counselor.assignedSchools.map((schoolName, index) => (
          <p key={index}>{schoolName}</p>
        ))}
      </label>
    </>
  )
}

export default CounselorDetails
