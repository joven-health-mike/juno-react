// Copyright 2022 Social Fabric, LLC

import React, { useRef, useState } from "react"
import { School } from "../../data/schools"

type CreateSchoolFormProps = {
  defaultSchool?: School
  onSubmit: (school: School) => void
  onCancel: () => void
}

const CreateSchoolForm: React.FC<CreateSchoolFormProps> = ({
  defaultSchool,
  onSubmit,
  onCancel,
}) => {
  const emptySchool = {
    name: "",
    email: "",
    facilitators: [],
  }

  const [school, setSchool] = useState(defaultSchool ?? emptySchool)

  const onAddFacilitator = (facilitator: string) => {
    let newFacilitators = school.facilitators
    newFacilitators.push(facilitator)

    setSchool({ ...school, facilitators: newFacilitators })
  }

  const onDeleteFacilitator = (e: any) => {
    e.preventDefault()
    let newFacilitators = school.facilitators.filter(
      (facilitatorName) => facilitatorName !== e.target.value
    )

    setSchool({ ...school, facilitators: newFacilitators })
  }

  const onFormSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(school)
  }

  const onFormCancel = (e: any) => {
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
            {school.facilitators.map((facilitatorName, index) => {
              return (
                <div key={index}>
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
type FacilitatorInputProps = {
  onAddFacilitator: (facilitator: string) => void
}

const FacilitatorInput: React.FC<FacilitatorInputProps> = ({
  onAddFacilitator,
}) => {
  const textBox = useRef<HTMLInputElement>(null)

  const onFormSubmit = (e: any) => {
    e.preventDefault()

    if (textBox && textBox.current) {
      const facilitatorName = textBox.current.value
      onAddFacilitator(facilitatorName)
      textBox.current.value = ""
    }
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
