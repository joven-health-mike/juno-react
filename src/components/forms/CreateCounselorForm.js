// Copyright 2022 Social Fabric, LLC

import React, { useState, useEffect } from "react"
import { SchoolsContext } from "../../data/schools"

const CreateCounselorForm = ({ defaultCounselor, onSubmit, onCancel }) => {
  const [counselor, setCounselor] = useState(
    defaultCounselor ?? {
      name: "",
      email: "",
      roomLink: "",
      assignedSchools: [],
    }
  )

  useEffect(() => {
    // set checkboxes based on initial assignedSchools
  })

  const onSchoolChecked = (e) => {
    const schoolName = e.target.value
    const exists = counselor.assignedSchools.includes(schoolName)
    let newAssignedSchools
    if (exists) {
      newAssignedSchools = counselor.assignedSchools.filter(
        (school) => school !== schoolName
      )
    } else {
      newAssignedSchools = [...counselor.assignedSchools]
      newAssignedSchools.push(schoolName)
    }

    e.target.checked = !exists
    setCounselor({ ...counselor, assignedSchools: newAssignedSchools })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit(counselor)
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <h1>Create Counselor</h1>
        <label>
          Name
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={counselor.name}
            required
            onChange={(e) =>
              setCounselor({ ...counselor, name: e.target.value })
            }
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={counselor.email}
            required
            onChange={(e) =>
              setCounselor({ ...counselor, email: e.target.value })
            }
          />
        </label>
        <label>
          Room Link
          <input
            type="text"
            placeholder="Room Link"
            name="roomLink"
            value={counselor.roomLink}
            required
            onChange={(e) =>
              setCounselor({ ...counselor, roomLink: e.target.value })
            }
          />
        </label>
        <label>
          Associated Schools:{" "}
          <SchoolsContext.Consumer>
            {(schools) =>
              schools.map((school) => (
                <label key={school.name}>
                  {school.name}
                  <input
                    type="checkbox"
                    value={school.name}
                    onChange={onSchoolChecked}
                  />
                </label>
              ))
            }
          </SchoolsContext.Consumer>
        </label>

        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  )
}

export default CreateCounselorForm
