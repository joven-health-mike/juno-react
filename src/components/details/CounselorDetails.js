// Copyright 2022 Social Fabric, LLC

import React from "react"

const CounselorDetails = ({ counselor }) => {
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
        {counselor.assignedSchools.map((schoolName) => (
          <p>{schoolName}</p>
        ))}
      </label>
    </>
  )
}

export default CounselorDetails
