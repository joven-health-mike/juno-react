// Copyright 2022 Social Fabric, LLC

import React, { useCallback, useContext, useEffect, useState } from "react"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"
import { StudentsContext } from "../../data/students"
import { ROLES } from "../../data/users"

const CreateUserForm = ({ defaultUser, onSubmit, onCancel }) => {
  const emptyUser = {
    name: "",
    email: "",
    password: "",
    role: "",
    associatedAccount: "",
  }
  const [user, setUser] = useState(defaultUser ?? emptyUser)
  const [accountOptions, setAccountOptions] = useState([])
  const { counselors } = useContext(CounselorsContext)
  const { schools } = useContext(SchoolsContext)
  const { students } = useContext(StudentsContext)

  // update account drop-down options anytime the role changes
  const updateAccountOptions = useCallback(() => {
    console.log("updateAccountOptions for role:", user.role)
    let data = []

    switch (user.role) {
      case "admin":
        data.push("admin")
        break
      case "counselor":
        counselors.forEach((counselor) => {
          data.push(counselor.name)
        })
        break
      case "facilitator":
        schools.forEach((school) => {
          school.facilitators.forEach((facilitatorName) => {
            data.push(facilitatorName)
          })
        })
        break
      case "school":
        schools.forEach((school) => {
          data.push(school.name)
        })
        break
      case "student":
      case "guardian":
        students.forEach((student) => {
          data.push(student.first_name + " " + student.last_name)
        })
        break
      default:
        break
    }
    setAccountOptions(data)
  }, [counselors, schools, students, user.role])

  // set up initial account options based on the defaultUser role
  useEffect(() => {
    updateAccountOptions(user.role)
  }, [updateAccountOptions, user.role])

  const onRoleChanged = (e) => {
    e.preventDefault()
    const role = e.target.value.includes("Select") ? "" : e.target.value
    setUser({ ...user, role: role })
    updateAccountOptions(role)
  }

  const onAccountChanged = (e) => {
    e.preventDefault()
    const associatedAccount = e.target.value.includes("Select")
      ? ""
      : e.target.value
    setUser({ ...user, associatedAccount: associatedAccount })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit(user)
  }

  const onFormCancel = (e) => {
    e.preventDefault()
    setUser(emptyUser)
    onCancel()
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Name
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </label>
      <label>
        Role:{" "}
        <select value={user.role} onChange={onRoleChanged}>
          <option key={"Select a Role"}>Select a Role</option>
          {ROLES.map((role, index) => {
            return <option key={index}>{role}</option>
          })}
        </select>
      </label>
      <label>
        Associated Account:{" "}
        <select value={user.associatedAccount} onChange={onAccountChanged}>
          <option key={"Select an Account"}>Select an Account</option>
          {accountOptions.map((option, index) => {
            return <option key={index}>{option}</option>
          })}
        </select>
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  )
}

export default CreateUserForm
