// Copyright 2022 Social Fabric, LLC

import React, { useRef, useState } from "react"

const CreateSchoolForm = ({ defaultSchool, onSubmit, onCancel }) => {
  const emptySchool = {
    name: "",
    email: "",
    facilitators: [],
  }

  const [school, setSchool] = useState(defaultSchool ?? emptySchool)

  const onAddFacilitator = (facilitator) => {
    let newFacilitators = school.facilitators
    newFacilitators.push(facilitator)

    setSchool({ ...school, facilitators: newFacilitators })
  }

  const onDeleteFacilitator = (e) => {
    e.preventDefault()
    let newFacilitators = school.facilitators.filter(
      (facilitatorName) => facilitatorName !== e.target.value
    )

    setSchool({ ...school, facilitators: newFacilitators })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit(school)
  }

  const onFormCancel = (e) => {
    e.preventDefault()
    setSchool(emptySchool)
    onCancel()
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={school.name}
            required
            onChange={(e) => setSchool({ ...school, name: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={school.email}
            required
            onChange={(e) => setSchool({ ...school, email: e.target.value })}
          />
        </label>
        <label>
          Facilitators
          <div>
            {school.facilitators.map((facilitatorName) => {
              return (
                <div key={facilitatorName}>
                  <p>{facilitatorName}</p>
                  <button
                    type="button"
                    value={facilitatorName}
                    onClick={onDeleteFacilitator}
                  >
                    X
                  </button>
                </div>
              )
            })}
            <FacilitatorInput onAddFacilitator={onAddFacilitator} />
          </div>
        </label>

        <button type="submit">Submit</button>
        <button type="button" onClick={onFormCancel}>
          Cancel
        </button>
      </form>
    </>
  )
}

// a separate component to hold the facilitator input box and + button
const FacilitatorInput = ({ onAddFacilitator }) => {
  const textBox = useRef(null)

  const onFormSubmit = (e) => {
    e.preventDefault()

    const facilitatorName = textBox.current.value
    onAddFacilitator(facilitatorName)
    textBox.current.value = ""
  }

  return (
    <>
      <input
        ref={textBox}
        type="text"
        placeholder="Facilitator Name"
        name="facilitatorName"
      />
      <button type="button" onClick={onFormSubmit}>
        +
      </button>
    </>
  )
}

export default CreateSchoolForm
